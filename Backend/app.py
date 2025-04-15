from flask import Flask, request, jsonify
from predictor import validate_input, predict_crop

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

if __name__ == "__main__":
    app.run(debug=True)
