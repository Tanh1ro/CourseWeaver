from pymongo import MongoClient
from pymongo.database import Database
import os
from dotenv import load_dotenv

load_dotenv()

# MongoDB connection
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "courseweaver")

client: MongoClient = None
database: Database = None

def connect_to_mongo():
    global client, database
    try:
        client = MongoClient(MONGODB_URI)
        database = client[DATABASE_NAME]
        # Test the connection
        client.admin.command('ping')
        print("✅ Connected to MongoDB!")
        return database
    except Exception as e:
        print(f"❌ Failed to connect to MongoDB: {e}")
        raise e

def close_mongo_connection():
    global client
    if client:
        client.close()
        print("🔌 MongoDB connection closed")

def get_database() -> Database:
    if database is None:
        connect_to_mongo()
    return database

# Collections
def get_courses_collection():
    return get_database().courses

def get_syllabi_collection():
    return get_database().syllabi

def get_outcomes_collection():
    return get_database().outcomes

def get_books_collection():
    return get_database().books 