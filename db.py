from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client['studybuddy']
collection = db['details']

def get_details():
    return collection