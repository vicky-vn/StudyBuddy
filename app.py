from flask import Flask, request, jsonify
from db import get_user_input_collection
from flask_cors import CORS
from agents import generate_summary
from bson.objectid import ObjectId
import traceback
import fitz
import docx

app = Flask(__name__)

CORS(app)
@app.route('/')
def hello_world():  # put application's code here
    return '!!!StudyBuddy is Here!!!'


ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text_from_pdf(file):
    try:
        doc = fitz.open(stream=file.read(), filetype="pdf")
        text = "\n".join([page.get_text() for page in doc])
        return text.strip()
    except Exception as e:
        return f"Error extracting text from PDF: {str(e)}"

def extract_text_from_docx(file):
    try:
        doc = docx.Document(file)
        text = "\n".join([para.text for para in doc.paragraphs])
        return text.strip()
    except Exception as e:
        return f"Error extracting text from DOCX: {str(e)}"


@app.route('/post_user_input', methods=['POST'])
def post_user_input():
    collection = get_user_input_collection()

    if 'session_name' not in request.form:
        return jsonify({"error": "'session_name' is required."}), 400

    session_name = request.form['session_name']
    input_text = None

    language = request.form.get('language', 'English')

    if 'file' in request.files:
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No selected file."}), 400
        if file and allowed_file(file.filename):
            file_ext = file.filename.rsplit('.', 1)[1].lower()

            if file_ext == 'pdf':
                input_text = extract_text_from_pdf(file)
            elif file_ext in ['doc', 'docx']:
                input_text = extract_text_from_docx(file)
            else:
                return jsonify({"error": "Unsupported file format."}), 400
        else:
            return jsonify({"error": "Invalid file type."}), 400

    elif 'input_text' in request.form:
        input_text = request.form['input_text']

    else:
        return jsonify({"error": "Either 'input_text' or a file must be provided."}), 400

    if not input_text:
        return jsonify({"error": "Extracted text is empty or invalid."}), 400

    input_data = {
        "session_name": session_name,
        "input_text": input_text,
        "language": language,
        "summary": None
    }

    inserted_id = collection.insert_one(input_data).inserted_id
    return jsonify({"message": "User input added successfully!", "id": str(inserted_id), "language": language}), 201

@app.route('/get_user_input', methods=['GET'])
def get_user_input():

    collection = get_user_input_collection()

    data = list(collection.find())

    for item in data:
        item['_id'] = str(item['_id'])

    return jsonify(data), 200


@app.route('/summarize', methods=['POST'])
def summarize():
    try:
        data = request.get_json()

        if 'id' not in data:
            return jsonify({"error": "'id' is required."}), 400

        record_id = data['id']

        try:
            object_id = ObjectId(record_id)
        except:
            return jsonify({"error": "Invalid ObjectId format."}), 400

        collection = get_user_input_collection()
        user_record = collection.find_one({"_id": object_id})

        if not user_record:
            return jsonify({"error": "No record found for the given ID."}), 404

        input_text = user_record['input_text']
        difficulty_level = data.get('difficulty_level', 'Beginner')  # ✅ Default to Beginner
        language = data.get('language', 'English')  # ✅ Default to English

        print(f"Processing summary for id={record_id}, difficulty_level={difficulty_level}, language={language}")  # Debug log

        # ✅ Pass both `difficulty_level` and `language` to `generate_summary()`
        summarized_text = generate_summary(input_text, difficulty_level, language)

        print(f"Generated Summary: {summarized_text}")  # Debug log

        collection.update_one(
            {"_id": object_id},
            {"$set": {"summary": summarized_text}}
        )

        return jsonify({"id": record_id, "summary": summarized_text, "language": language}), 200

    except Exception as e:
        print("Error:", e)
        traceback.print_exc()  # Print the full error traceback
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500

if __name__ == '__main__':
    app.run()