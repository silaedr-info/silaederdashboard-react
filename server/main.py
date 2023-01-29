from flask import Flask, request, url_for, redirect
from gevent.pywsgi import WSGIServer
from db import DB
from api import API
from srv import Srv

app = Flask(__name__)
authed = {
    '127.0.0.1': {'username': 'max', 'password': 'rjlbnm2010'}
}
dev = True
db = DB()
api = API(app)
srv = Srv(app, api, api.ssh_config)


def ccheck():
    ip = request.remote_addr
    if request.path.split('/')[1] not in ['login', 'static']:
        if ip not in authed:
            return redirect('/login')
        else:
            if not db.check_user(**authed[ip]):
                return redirect('/login')


@app.route('/check', methods=['GET', 'POST'])
def login():
    if db.check_user(**{'username': request.form.get('user'), 'password': request.form.get('password')}):
        return "true"
    else:
        return 'false'


if __name__ == '__main__':
    if dev:
        app.run('0.0.0.0', 8080, debug=True)
    else:
        http_server = WSGIServer(('0.0.0.0', 80), app)
        http_server.serve_forever()
    api.ssh_sil.close()
