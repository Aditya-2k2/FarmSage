import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.multiclass import OneVsRestClassifier
import joblib

# Load dataset
df = pd.read_excel("Crop prediction model dataset.xlsx")

# Generate synthetic samples from range
X_augmented = []
y_augmented = []

for i, row in df.iterrows():
    crop = row['Crop']
    for _ in range(10):  # few synthetic samples to reduce load
        sample = []
        for j in range(1, len(row), 2):
            min_val = row[j]
            max_val = row[j + 1]
            val = round(np.random.uniform(min_val, max_val), 4)
            sample.append(val)
        X_augmented.append(sample)
        y_augmented.append([crop])

# Convert to arrays
X_final = np.array(X_augmented)
mlb = MultiLabelBinarizer()
y_final = mlb.fit_transform(y_augmented)

# Split
X_train, X_test, y_train, y_test = train_test_split(X_final, y_final, test_size=0.2, random_state=42)

# Train model
model = OneVsRestClassifier(RandomForestClassifier(n_estimators=50, random_state=42, n_jobs=1))
model.fit(X_train, y_train)

# Save model and encoder
joblib.dump(model, "xgb_crop_model.pkl")
joblib.dump(mlb, "crop_label_binarizer.pkl")

print("✅ Model trained and saved as xgb_crop_model.pkl")
