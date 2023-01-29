from flask import render_template, redirect, request
from pathlib import Path
import math
import string


def convert_size(size_bytes):
    if size_bytes == 0:
        return "0B"
    size_name = ("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB")
    i = int(math.floor(math.log(size_bytes, 1024)))
    p = math.pow(1024, i)
    s = round(size_bytes / p, 2)
    return "%s %s" % (s, size_name[i])


class Srv:
    def __init__(self, app, api, ssh_conf):
        self.app = app
        self.api = api
        self.ssh_conf = ssh_conf
        self.current_page = '/ssrv'

        @app.route("/ssrv")
        def ssrv():
            ports = []
            self.current_page = '/ssrv'
            return render_template("ssrv.html", **self.api.data, ports=ports)

        @app.route("/ssrvterm")
        def ssrvterm():
            self.current_page = '/ssrvterm'
            return render_template("ssrvterm.html")

        @app.route("/ssrvfiles")
        def redir1():
            return redirect('/ssrvfiles/?path=/home/max')

        @app.route("/ssrvfiles/", methods=['GET', 'POST'])
        def ssrvfiles():
            if request.method == 'POST':
                uploaded_file = request.files['file']
                if uploaded_file.filename != '':
                    uploaded_file.save(uploaded_file.filename)
                    print(type(uploaded_file))
                return redirect("/ssrv")

            self.current_page = f'/ssrvfiles/?path={request.args["path"]}'
            path = Path(request.args['path'])
            files = [{
                "name": ' . . ',
                "size": '',
                "file": False,
                "link": "/ssrvfiles/?path=" + str(path.parent).replace('\\', '/')
            }]
            backslash = "\\"
            for file in self.api.ssh_command(f'ls {str(path).replace(backslash, "/")}').split('\n'):
                x = {
                    "name": file,
                    "file": int(self.api.ssh_command(
                        f'if [ -f "{str(path.joinpath(file)).replace(backslash, "/")}" ]; then echo "1"; '
                        f'else echo "0"; fi')),
                    "link": f"/ssrvfiles/?path={str(path.joinpath(file)).replace(backslash, '/')}"}
                if x['file']:
                    s = self.api.ssh_command(f"ls -lh {str(path.joinpath(file)).replace(backslash, '/')}"+" | awk '{print $5}'")
                    xs = ''
                    xf = ''
                    for i in s:
                        if i in string.digits:
                            xs += i
                        elif i == ',':
                            xs += '.'
                        else:
                            xf += i
                    if xf == '':
                        xf = 'B'
                    s = xs+' '+xf
                    x.update({'size': s})
                files.append(x)
            return render_template("ssrvfiles.html", files=files, path=str(path).replace('\\', '/'))
