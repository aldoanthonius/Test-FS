from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Posts(db.Model):

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(100), nullable=False)
    created_date = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())
    updated_date = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    status = db.Column(db.String(100), nullable=False)  # "publish", "draft", "thrash"
