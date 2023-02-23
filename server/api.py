import paramiko
import yaml
import json
from marks.plusnik import get_mark
from flask import request, jsonify
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler


class API:
    def update_usercache(self):
        select = self.db.conn.execute("SELECT username, password password FROM users").fetchall()
        for i in select:
            x = self.db.get_user_data(*i)
            d = x['lastname'] + " " + x['firstname']
            marks = get_mark(d)
            self.db.conn.execute(f"INSERT INTO usermarkscache VALUES({x['user_id']}, '{str(datetime.now()).split('.')[0]}', '{marks['sum_marks']}')")

    def __init__(self, app, get_user, db):
        self.app = app
        with open("../config/server_ssh.yaml", 'r') as stream:
            self.ssh_config = yaml.safe_load(stream)
        self.ssh_sil = paramiko.SSHClient()
        self.ssh_sil.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        self.ssh_sil.connect(hostname=self.ssh_config['host'], port=self.ssh_config['port'],
                             password=self.ssh_config['password'], username=self.ssh_config['user'])
        self.data = self.get_data()
        self.db = db
        self.update_usercache()
        sched = BackgroundScheduler(daemon=True)
        sched.add_job(self.update_usercache,'interval',minutes=1440)
        sched.start()
        self.get_mark = get_mark

        @app.route('/api/srv/stats')
        def srv():
            self.data = self.get_data()
            return json.dumps(self.data)

        @app.route('/api/marks/plusnik', methods=['GET'])
        def plusnik():
            x = self.db.get_user_data(**get_user(request.remote_addr))
            d = x['lastname'] + " " + x['firstname']
            marks = get_mark(d)
            ret = marks
            tb = get_user(request.remote_addr)
            tb.update({"table": "usermarkscache", "data": "matprakmark"})
            lastmark = self.db.get_user_data(**tb)[-1]
            ret.update({"change": marks['sum_marks'] - float(lastmark)})
            return jsonify(ret)

    def ssh_command(self, cmd, sudo=False):
        if sudo:
            stdin, stdout, stderr = self.ssh_sil.exec_command(f"sudo -S {cmd}")
            stdin.write(self.ssh_config['password'] + '\n')
        else:
            stdin, stdout, stderr = self.ssh_sil.exec_command(cmd)
        stdin.flush()
        return stdout.read().decode().strip('\n')

    def get_data(self):
        ram_total = float(self.ssh_command("free -m | awk 'NR == 2 {print $2}'"))
        ram_used = float(self.ssh_command("free -m | awk 'NR == 2 {print $3}'"))
        cpu_usage = float(self.ssh_command("vmstat 1 2 | awk '{print $15}' | tail -1 | awk '{print 100-$1}'"))
        disk_totalmb = int(self.ssh_command("df /boot/ | awk 'NR==2 {print $2}'").replace(',', '.'))
        disk_usedmb = int(self.ssh_command("df /boot/ | awk 'NR==2 {print $3}'").replace(',', '.'))
        disk_usage_percentage = int(self.ssh_command("df /boot/ | awk 'NR==2 {print $5}'").strip('%'))
        datas = [
            "OS",
            "CPU",
            "GPU",
            "Kernel",
            "Uptime",
            "Packages",
            "Shell"
        ]
        ext = {
            "cpuload": cpu_usage,
            "maxram": ram_total,
            "usedram": ram_used,
            "maxdisk": disk_totalmb,
            "useddisk": disk_usedmb,
            "diskpercentage": disk_usage_percentage,
        }
        for i in datas:
            ext.update({i: self.ssh_command(
                f'neofetch --off | grep {i}')
            .replace('\u001b[0m', '')
            .replace('\u001b[31m', '')
            .replace('\u001b[1m', '')
            .strip(
                f'{i}: ')})
        return ext
 