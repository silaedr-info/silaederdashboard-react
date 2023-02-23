from sqlalchemy import create_engine, MetaData, Table, String, Integer, Column, select
import hashlib


def injection_scan(string):
    kwords = [" ", "`", '*', ';', '(', ')']
    for i in kwords:
        if i in string:
            return True
    return False


class DB:
    def __init__(self):
        # Defining engine''
        self.engine = create_engine("sqlite:///../db/data.db", echo=False, connect_args={"check_same_thread": False})
        self.conn = self.engine.connect()

        # Defining MetaData
        self.metadata = MetaData()

        # Users table
        self.users_table = Table('users', self.metadata,
                                 Column('user_id', Integer(), primary_key=True),
                                 Column('username', String()),
                                 Column('password', String())
                                 )
        self.userdata_table = Table(
            "userdata", self.metadata,
            Column('id', Integer(), primary_key=True),
            Column('user_id', Integer()),
            Column('mash_login', String()),
            Column('mash_password', String()),
            Column('lastname', String()),
            Column('firstname', String()),
        )

    def insert_user(self, username, password):
        if injection_scan(username):
            return False
        all_usernames = self.engine.execute(select([self.users_table.c.username])).fetchall()
        if username in all_usernames:
            return False
        insertion = self.users_table.insert().values(
            username=username,
            password=hashlib.sha256(password.encode()).hexdigest()
        )
        self.conn.execute(insertion)
        return True

    def check_user(self, username, password):

        selection = select([self.users_table.c.password]).where(
            self.users_table.c.username == username
        )
        if injection_scan(username):
            return False
        selection = self.conn.execute(f'SELECT `password` FROM `users` WHERE username="{username}"').fetchone()
        if len(selection) != 0:
            user = selection[0]
            if user == password:
                return True
        return False
    
    def get_user_data(self, username, password, table='userdata', data="*"):
        if not self.check_user(username, password):
            return False
        return self.conn.execute(f"SELECT {data} from `{table}` join users using(user_id) WHERE username='{username}'").fetchone()