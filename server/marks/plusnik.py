import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']

matprak_plusnik = '1GfRGWH9PzMkfqhCmgNSN2ejj7ih-W97caYd9QPSgM9c'
class_ = 7
range_ = f'{class_} класс'


def get_mark(student):
    # Auth token
    creds = None
    if os.path.exists('../config/token.json'):
        creds = Credentials.from_authorized_user_file('../config/token.json', SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                '../config/creditionals.json', SCOPES)
            creds = flow.run_local_server(port=0)
        with open('../config/token.json', 'w') as token:
            token.write(creds.to_json())

    try:
        service = build('sheets', 'v4', credentials=creds)

        sheet = service.spreadsheets().values().get(spreadsheetId=matprak_plusnik, range=range_).execute()

        values = sheet.get('values', [])

        for row in values:
            if row == []:
                break
            if student.lower() in row[0].lower():
                sum_marks = float(row[10].replace(',', '.'))
                last_theme_mark = float(row[-1].replace(',', '.'))
        
        return {
            "sum_marks": sum_marks,
            "last_theme_mark": last_theme_mark,

            }
                



    except HttpError as err:
        print(err)