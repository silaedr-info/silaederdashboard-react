from flask import Flask, request, url_for, redirect, abort
from gevent.pywsgi import WSGIServer
from db import DB
from api import API
from srv import Srv
import yaml
import time

app = Flask(__name__)
authed = {
}
dev = True
db = DB()
api = API(app)
srv = Srv(app, api, api.ssh_config)
with open("../config/api_config.yaml", 'r') as stream:
    config = yaml.safe_load(stream)
sessions = {}


@app.before_request
def check_referrer():
    if request.remote_addr not in sessions:
        sessions.update({request.remote_addr: {"last_reconnect": time.time(), 'fast_reconnects': 0}})
    else:
        if sessions[request.remote_addr]['fast_reconnects'] >= 10:
            abort(403)
        last_reconnect = sessions[request.remote_addr]['last_reconnect']
        sessions[request.remote_addr]['last_reconnect'] = time.time()
        if time.time() - last_reconnect < 5000:
            sessions[request.remote_addr]['fast_reconnects'] += 1
    if not request.referrer == config['referrer']:
        abort(400)


def ccheck():
    ip = request.remote_addr
    if request.path.split('/')[1] not in ['login', 'static']:
        if ip not in authed:
            return redirect('/login')
        else:
            if not db.check_user(**authed[ip]):
                return redirect('/login')


@app.route('/api/check', methods=['GET', 'POST'])
def login():
    if request.method == "POST":
        print({'username': request.form.get('user'), 'password': request.form.get('password')})
        if db.check_user(**{'username': request.form.get('user'), 'password': request.form.get('password')}):
            return "true"
        else:
            return 'false'
    else:
        return "false"


if __name__ == '__main__':
    if dev:
        app.run('0.0.0.0', 5000, debug=True)
    else:
        http_server = WSGIServer(('0.0.0.0', 80), app)
        http_server.serve_forever()
    api.ssh_sil.close()
