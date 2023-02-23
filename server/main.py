from flask import Flask, request, url_for, redirect, abort, Response
from gevent.pywsgi import WSGIServer
from db import DB
from api import API
from srv import Srv
import time
from flask_cors import CORS

app = Flask(__name__)
def get_current_user(ip):
    return {"username": sessions[ip]["username"], "password": sessions[ip]["password"]}

dev = True
db = DB()
CORS(app)
api = API(app, get_current_user, db)
srv = Srv(app, api, api.ssh_config)
sessions = {}
@app.after_request
def add_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
    return response

@app.before_request
def check_referrer():
    if request.path != "/api/auth":
        if (request.remote_addr not in sessions):
            return abort(403)
        else:
            if sessions[request.remote_addr]['fast_reconnects'] >= 100:
                abort(403)
            last_reconnect = sessions[request.remote_addr]['last_reconnect']
            sessions[request.remote_addr]['last_reconnect'] = time.time()
            if time.time() - last_reconnect < 5000:
                sessions[request.remote_addr]['fast_reconnects'] += 1


@app.route('/api/auth', methods=['GET', 'POST'])
def login():
    if request.method == "POST":
        if db.check_user(**{'username': request.form.get('user'), 'password': request.form.get('password')}):
            if request.remote_addr not in sessions:
                sessions.update({request.remote_addr: {"last_reconnect": time.time(), 'fast_reconnects': 0, 'username': request.form.get('user'), 'password': request.form.get('password')}})
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
