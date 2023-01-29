import paramiko
import yaml
import json


class API:
    def __init__(self, app):
        self.app = app
        with open("../config/server_ssh.yaml", 'r') as stream:
            self.ssh_config = yaml.safe_load(stream)
        self.ssh_sil = paramiko.SSHClient()
        self.ssh_sil.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        self.ssh_sil.connect(hostname=self.ssh_config['host'], port=self.ssh_config['port'],
                             password=self.ssh_config['password'], username=self.ssh_config['user'])
        commands = """cat /proc/meminfo | grep MemTotal | awk '{print $2/1024}'
cat /proc/meminfo | grep MemFree | awk '{print $2/1024}'
grep 'cpu ' /proc/stat | awk '{usage=($2+$4)*100/($2+$4+$5)} END {print usage}'
netstat -ntlp | awk '{print $4}'""".split('\n')
        self.data = self.get_data()

        @app.route('/api/srv/')
        def srv():
            self.data = self.get_data()

            return json.dumps(self.data)

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
