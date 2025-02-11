import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:@localhost/article'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
