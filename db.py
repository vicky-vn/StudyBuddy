from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client['studybuddy']

user_input_collection = db['user_input']
summary_collection = db['summary']

def get_user_input_collection():
    return user_input_collection

def get_summary_collection():
    return summary_collection