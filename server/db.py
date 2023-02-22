from sqlalchemy import create_engine, MetaData, Table, String, Integer, Column
from md5 import md5

class DB:
    def __init__(self):
        # Defining engine''
        self.engine = create_engine("sqlite:///../db/data.db", echo=False, connect_args={"check_same_thread": False})
        self.conn = self.engine.connect()

        # Defining MetaData
        self.metadata = MetaData()

        # Users table
        self.users_table = Table('users', self.metadata,
                                 Column('id', Integer(), primary_key=True),
                                 Column('username', String()),
                                 Column('password', String())
                                 )
        self.userdata_table = Table(
            "userdata", self.metadata,
            Column('id', Integer(), primary_key=True),
            Column('user_id', Integer()),
            Column('mash_login', String()),
            Column('mash_password', String()),
        )

    def insert_user(self, username, password):
        all_usernames = []
        for i in self.get_all_users():
            all_usernames.append(i[1])
        if username in all_usernames:
            return False
        insertion = self.users_table.insert().values(
            username=username,
            password=md5(password)
        )
        self.conn.execute(insertion)

    def get_all_users(self):
        selection = self.users_table.select()
        return self.conn.execute(selection).all()

    def check_user(self, username, password):
        selection = self.users_table.select().where(
            self.users_table.c.username == username
        )
        selection = self.conn.execute(selection).all()
        if len(selection) != 0:
            user = selection[0]
            if user[2] == md5(password):
                return True
        return False
    
    def get_user_data(self, username, password):
        if not self.check_user(username, password):
            return False
        selection = self.users_table.select().where(
            self.users_table.c.username == username
        )
        selection = self.conn.execute(selection).all()
        if len(selection) <= 0:
            return False
        id = selection[0][0]
        selection = self.conn.execute(self.userdata_table.select().where(self.userdata_table.c.user_id == id)).all()
        if len(selection) <= 0: return False
        return selection[0]


