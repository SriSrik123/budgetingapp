import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)  # allows requests from React

load_dotenv()

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password= os.getenv("DB_PASSWORD"),
    database="BudgetingApp"
)
cursor = db.cursor()

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    password = data['password']  # Hash this before storing!
    cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
    db.commit()
    return jsonify({"message": "User registered successfully"})
