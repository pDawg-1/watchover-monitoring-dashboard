from flask import Flask
from flask_cors import CORS
import psutil

app = Flask(__name__)

CORS(app)


@app.route("/")
def home():
    return {
        "message": "InsightBoard Backend Running"
    }


@app.route("/cpu")
def cpu_usage():
    return {
        "cpu": psutil.cpu_percent(interval=1)
    }


@app.route("/memory")
def memory_usage():
    return {
        "memory": psutil.virtual_memory().percent
    }


@app.route("/disk")
def disk_usage():
    return {
        "disk": psutil.disk_usage("/").percent
    }


if __name__ == "__main__":
    app.run(debug=True)