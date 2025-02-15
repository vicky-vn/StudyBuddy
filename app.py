from flask import Flask, request, jsonify
from db import get_details
app = Flask(__name__)

@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'

@app.route('/post_user_input', methods=['POST'])
def post_user_input():
    data = request.get_json()

    if 'session_name' not in data or 'input_text' not in data:
        return jsonify({"error": "Both 'session_name' and 'input_text' are required."}), 400

    session_name = data['session_name']
    input_text = data['input_text']

    input_data = {
        "session_name": session_name,
        "input_text": input_text
    }

    collection = get_details()
    collection.insert_one(input_data)

    return jsonify({"message": "User input added successfully!"}), 201

if __name__ == '__main__':
    app.run()
