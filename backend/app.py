from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

model_path = os.path.join(os.path.dirname(__file__), "model", "model.joblib")
model = joblib.load(model_path)

@app.route("/")
def home():
    return "Flask is running"

@app.route("/predict",methods=["POST"])
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
    app.run(debug=True)