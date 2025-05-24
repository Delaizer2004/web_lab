from flask import Flask, request, jsonify, render_template
from database import pg_conn, pg_cursor, logs_collection

app = Flask(__name__)

# Головна сторінка
@app.route("/")
def index():
    return render_template("index.html")

# 🔹 Додавання нового клієнта (CREATE)
@app.route("/clients", methods=["POST"])
def add_client():
    data = request.json
    query = """
        INSERT INTO clients (first_name, last_name, email, phone, address, city, country) 
        VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id;
    """
    values = (data["first_name"], data["last_name"], data["email"], 
              data["phone"], data["address"], data["city"], data["country"])
    pg_cursor.execute(query, values)
    pg_conn.commit()
    
    client_id = pg_cursor.fetchone()[0]
    logs_collection.insert_one({"action": "add_client", "client_id": client_id, "data": data})

    return jsonify({"message": "Клієнт доданий!", "id": client_id})


# 🔹 Отримання всіх клієнтів (READ)
@app.route("/clients", methods=["GET"])
def get_clients():
    pg_cursor.execute("SELECT * FROM clients;")
    clients = pg_cursor.fetchall()
    return jsonify([{
        "id": c[0], "first_name": c[1], "last_name": c[2], "email": c[3], 
        "phone": c[4], "address": c[5], "city": c[6], "country": c[7], "created_at": str(c[8])
    } for c in clients])


# 🔹 Отримання одного клієнта за ID (READ)
@app.route("/clients/<int:client_id>", methods=["GET"])
def get_client(client_id):
    pg_cursor.execute("SELECT * FROM clients WHERE id = %s;", (client_id,))
    client = pg_cursor.fetchone()
    if not client:
        return jsonify({"error": "Клієнт не знайдений"}), 404
    return jsonify({
        "id": client[0], "first_name": client[1], "last_name": client[2], "email": client[3],
        "phone": client[4], "address": client[5], "city": client[6], "country": client[7], "created_at": str(client[8])
    })


# 🔹 Оновлення клієнта (UPDATE)
@app.route("/clients/<int:client_id>", methods=["PUT"])
def update_client(client_id):
    data = request.json
    query = """
        UPDATE clients 
        SET first_name = %s, last_name = %s, email = %s, phone = %s, 
            address = %s, city = %s, country = %s
        WHERE id = %s RETURNING id;
    """
    values = (data["first_name"], data["last_name"], data["email"], data["phone"], 
              data["address"], data["city"], data["country"], client_id)
    
    pg_cursor.execute(query, values)
    if pg_cursor.rowcount == 0:
        return jsonify({"error": "Клієнт не знайдений"}), 404
    pg_conn.commit()
    
    logs_collection.insert_one({"action": "update_client", "client_id": client_id, "updated_data": data})

    return jsonify({"message": "Клієнт оновлений!"})


# 🔹 Видалення клієнта (DELETE)
@app.route("/clients/<int:client_id>", methods=["DELETE"])
def delete_client(client_id):
    pg_cursor.execute("DELETE FROM clients WHERE id = %s RETURNING id;", (client_id,))
    if pg_cursor.rowcount == 0:
        return jsonify({"error": "Клієнт не знайдений"}), 404
    pg_conn.commit()

    logs_collection.insert_one({"action": "delete_client", "client_id": client_id})

    return jsonify({"message": "Клієнт видалений!"})


# 🔹 Отримання логів дій (READ)
@app.route("/logs", methods=["GET"])
def get_logs():
    logs = list(logs_collection.find({}, {"_id": 0}))
    return jsonify(logs)


if __name__ == "__main__":
    app.run(debug=True)
