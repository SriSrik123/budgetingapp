import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import mysql.connector
from dotenv import load_dotenv

# Load environment variables (e.g., DB_PASSWORD from .env file)
load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

# Connect to MySQL database
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password=os.getenv("DB_PASSWORD"),
    database="BudgetingApp"
)
cursor = db.cursor()

# Route for user registration
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    print("Received signup data:", data)  # Debugging line
    username = data.get('user_name')
    password = data.get('pass_code')

    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400

    hashed_password = generate_password_hash(password)

    try:
        cursor.execute(
            "INSERT INTO users (user_name, pass_code) VALUES (%s, %s)",
            (username, hashed_password)
        )
        db.commit()
        return jsonify({"message": "User registered successfully"}), 201
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

# Route for user login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('user_name')
    password = data.get('pass_code')

    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400

    try:
        cursor.execute("SELECT pass_code FROM users WHERE user_name = %s", (username,))
        result = cursor.fetchone()

        if result and check_password_hash(result[0], password):
            return jsonify({"message": "Login successful"}), 200
        else:
            return jsonify({"error": "Invalid credentials"}), 401

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
