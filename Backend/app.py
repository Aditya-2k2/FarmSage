from flask import Flask, request, jsonify, Blueprint
from predictor import validate_input, predict_crop

from fertilizer_predictor import predict_fertilizer_service

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    # Validate input
    is_valid, error_msg = validate_input(data)
    if not is_valid:
        return jsonify({"error": error_msg}), 400

    # Predict
    crops = predict_crop(data)
    return jsonify({"recommended_crops": crops})



#fertilizer_bp = Blueprint('fertilizer_bp', __name__)

@app.route('/predict-fertilizer', methods=['POST'])
def predict_fertilizer():
    try:
        data = request.get_json()

        # Ensure all fields are provided
        required_fields = [
            "Crop",
            "N (kg/ha) (Lower)", "N (kg/ha) (Upper)",
            "P (kg/ha) (Lower)", "P (kg/ha) (Upper)",
            "K (kg/ha) (Lower)", "K (kg/ha) (Upper)",
            "Ca (kg/ha) (Lower)", "Ca (kg/ha) (Upper)",
            "Mg (kg/ha) (Lower)", "Mg (kg/ha) (Upper)",
            "S (kg/ha) (Lower)", "S (kg/ha) (Upper)",
            "Fe (kg/ha) (Lower)", "Fe (kg/ha) (Upper)",
            "Mn (kg/ha) (Lower)", "Mn (kg/ha) (Upper)",
            "Cu (kg/ha) (Lower)", "Cu (kg/ha) (Upper)",
            "B (kg/ha) (Lower)", "B (kg/ha) (Upper)",
            "Mo (kg/ha) (Lower)", "Mo (kg/ha) (Upper)",
            "Zn (kg/ha) (Lower)", "Zn (kg/ha) (Upper)",
            "Soil pH (Lower)", "Soil pH (Upper)",
            "Rainfall (cm) (Lower)", "Rainfall (cm) (Upper)",
            "Humidity (%) (Lower)", "Humidity (%) (Upper)",
            "Soil Moisture (%) (Lower)", "Soil Moisture (%) (Upper)",
            "Water Holding Capacity (%) (Lower)", "Water Holding Capacity (%) (Upper)"
          ]

        for field in required_fields:
         if field not in data:
          raise ValueError(f"Missing field: {field}")


        # Predict using service
        result = predict_fertilizer_service(data)
        return jsonify({
         "recommended_fertilizer": result,
         "status": "success"
        })


    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
