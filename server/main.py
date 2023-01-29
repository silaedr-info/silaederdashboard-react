from flask import Flask, request, render_template, url_for, redirect, send_from_directory
from gevent.pywsgi import WSGIServer
from db import DB
from api import API
from srv import Srv
import os

app = Flask(__name__)
authed = {
    '127.0.0.1': {'username': 'max', 'password': 'rjlbnm2010'}
}
dev = True
db = DB()
api = API(app)
srv = Srv(app, api, api.ssh_config)


@app.before_request
def ccheck():
    ip = request.remote_addr
    if request.path.split('/')[1] not in ['login', 'static']:
        if ip not in authed:
            return redirect('/login')
        else:
            if not db.check_user(**authed[ip]):
                return redirect('/login')


@app.route('/login', methods=['GET', 'POST'])
def login():
    elif request.method == 'POST':
        authed.update({ip: {'username': request.form.get('user'), 'password': request.form.get('password')}})
        return redirect('/')


if __name__ == '__main__':
    if dev:
        app.run('0.0.0.0', 8080, debug=True)
    else:
        http_server = WSGIServer(('0.0.0.0', 80), app)
        http_server.serve_forever()
    api.ssh_sil.close()
