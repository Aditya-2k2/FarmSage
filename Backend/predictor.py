import joblib
import numpy as np

# Load model and label encoder
model = joblib.load("./Models/xgb_crop_model.pkl")
mlb = joblib.load("./Models/crop_label_binarizer.pkl")

# Define nutrient/weather range constraints
range_constraints = {
    'Nitrogen (N)': (0.04, 0.4),
    'Phosphorus (P₂O₅)': (0.01, 0.2),
    'Potassium (K₂O)': (0.02, 0.4),
    'Sulfur (S)': (0.01, 0.06),
    'Calcium (Ca)': (0.2, 0.7),
    'Magnesium (Mg)': (0.1, 0.38),
    'Iron (Fe)': (2.5, 9.2),
    'Manganese (Mn)': (1.0, 3.6),
    'Copper (Cu)': (0.2, 0.8),
    'Boron (B)': (0.1, 0.7),
    'Molybdenum (Mo)': (0.01, 0.045),
    'Chlorine (Cl)': (0.5, 1.05),
    'Nickel (Ni)': (0.01, 0.035),
    'Water': (0.2, 0.3),
    'Organic Matter': (0.02, 0.04),
    'Zinc (Zn)': (0.5, 2.4),
    'Temperature': (15, 35),
    'Rainfall': (30, 250)
}

input_order = list(range_constraints.keys())

def validate_input(data):
    for param in input_order:
        if param not in data:
            return False, f"Missing value for '{param}'"
        val = float(data[param])
        min_val, max_val = range_constraints[param]
        if not (min_val <= val <= max_val):
            return False, f"Enter proper range for {param}"
    return True, None

def predict_crop(data):
    input_values = [float(data[param]) for param in input_order]
    print("✅ Input Values:", input_values)

    proba = model.predict_proba([input_values])
    print("📊 Raw Probabilities:", proba)

    # Extract all crops with scores
    all_crops = [(mlb.classes_[i], prob) for i, prob in enumerate(proba[0])]
    # Sort by highest probability
    top_3 = sorted(all_crops, key=lambda x: x[1], reverse=True)[:3]
    result = [crop for crop, score in top_3]

    print("🌾 Top Recommended Crops:", result)
    return result
