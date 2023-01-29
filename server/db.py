from sqlalchemy import create_engine, MetaData, Table, String, Integer, Column
from md5 import md5


class DB:
    def __init__(self):
        # Defining engine
        self.engine = create_engine("sqlite:///data.db", echo=False, connect_args={"check_same_thread": False})
        self.conn = self.engine.connect()

        # Defining MetaData
        self.metadata = MetaData()

        # Users table
        self.users_table = Table('users', self.metadata,
                                 Column('id', Integer(), primary_key=True),
                                 Column('username', String()),
                                 Column('password', String())
                                 )

    def insert_user(self, username, password):
        all_usernames = []
        for i in self.get_all_users():
            all_usernames.append(i[1])
        if username in all_usernames:
            raise KeyError("Unable to insert user")
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
