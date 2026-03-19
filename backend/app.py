from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS
import os
import gdown

app = Flask(__name__)
CORS(app)

model_path = os.path.join(os.path.dirname(__file__), "model.joblib")

file_id = "1qToEJhC7-PSmEK52sft34K7rl0EGRW5J"

if not os.path.exists(model_path):
    url = f"https://drive.google.com/uc?id={file_id}"
    gdown.download(url, model_path, quiet=False)

model = joblib.load(model_path)


@app.route("/")
def home():
    return "Flask is running"


@app.route("/predict", methods=["POST"])
def predict():
    data = request.json["features"]

    features = [
        data["bedrooms"],
        data["bathrooms"],
        data["living_area"],
        data["lot_area"],
        data["floors"],
        data["waterfront"],
        data["views"],
        data["area_without_basement"],
        data["basement_area"],
        data["renovation_year"],
        data["living_area_renov"],
        data["lot_area_renov"],
        data["schools_nearby"],
        data["airport_distance"],
        data["old"]
    ]

    prediction = model.predict([features])

    return jsonify({
        "prediction": int(prediction[0])
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)