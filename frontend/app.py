from flask import Flask, jsonify
from config import Config
from models import db
from flask_migrate import Migrate
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

db.init_app(app)
migrate = Migrate(app, db)

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Article API!"})

if __name__ == '__main__':
    app.run(debug=True)


from routes import *
