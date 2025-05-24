import psycopg2
from pymongo import MongoClient

# Підключення до PostgreSQL
pg_conn = psycopg2.connect(
    dbname="client_dbpy",
    user="postgres",
    password="2420",
    host="localhost"
)
pg_cursor = pg_conn.cursor()

# Підключення до MongoDB
mongo_client = MongoClient("mongodb://localhost:27017/")
log_db = mongo_client["log_db"]
logs_collection = log_db["logs"]
