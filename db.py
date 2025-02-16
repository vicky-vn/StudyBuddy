from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client['studybuddy']

user_input_collection = db['user_input']

def get_user_input_collection():
    return user_input_collection