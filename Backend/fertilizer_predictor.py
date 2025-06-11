import xgboost as xgb
import joblib
import numpy as np
import pandas as pd

# Load model and encoders
model = xgb.XGBClassifier()
model.load_model("Models/fertilizer_classifier.json")

crop_encoder = joblib.load("Models/crop_encoder.pkl")
fertilizer_encoder = joblib.load("Models/fertilizer_encoder.pkl")

def predict_fertilizer_service(data_dict):
    """
    Predicts the recommended fertilizer based on user input.

    Parameters:
    - data_dict (dict): Dictionary containing all required input parameters

    Returns:
    - str: Name of the recommended fertilizer
    """

    try:
        # Prepare DataFrame from input
        input_df = pd.DataFrame([data_dict])

        # Encode 'Crop' field
        input_df["Crop"] = crop_encoder.transform(input_df["Crop"])

        # Predict
        prediction = model.predict(input_df)[0]
        fertilizer = fertilizer_encoder.inverse_transform([prediction])[0]

        return fertilizer

    except Exception as e:
        return {"error": str(e)}
