from flask import render_template, redirect, request
from pathlib import Path
import string
import json


class Srv:
    def __init__(self, app, api, ssh_conf):
        self.app = app
        self.api = api
        self.ssh_conf = ssh_conf
        self.current_page = '/ssrv'

        @app.route("/api/srv/files", methods=['GET', 'POST'])
        def ssrvfiles():
            if request.method == 'POST':
                uploaded_file = request.files['file']
                if uploaded_file.filename != '':
                    uploaded_file.save(uploaded_file.filename)
                    print(type(uploaded_file))
                return redirect("/ssrv")

            self.current_page = f'/ssrvfiles/?path={request.args["path"]}'
            path = Path(request.args['path'])
            files = []
            backslash = "\\"
            for file in self.api.ssh_command(f'ls {str(path).replace(backslash, "/")}').split('\n'):
                x = {
                    "name": file,
                    "is-file": int(self.api.ssh_command(
                        f'if [ -f "{str(path.joinpath(file)).replace(backslash, "/")}" ]; then echo "1"; '
                        f'else echo "0"; fi')),
                    "fullpath": str(path.joinpath(file)).replace(backslash, '/'),
                    "last-update": self.api.ssh_command(f"date -r {str(path.joinpath(file)).replace(backslash, '/')}"),
                }
                if x['is-file']:
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
            return json.dumps(files)
