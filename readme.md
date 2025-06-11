# 🌾 FarmSage - Crop Recommendation System

FarmSage is a smart and intuitive crop prediction web application that recommends the most suitable crops based on soil nutrient levels, water content, temperature, and rainfall. Powered by machine learning (XGBoost) and built with a modern React frontend and Flask backend.

---

## 🚀 Features

- 🌿 Crop Prediction using real-world soil, climate, and organic input
- 🧠 Machine Learning Model trained with XGBoost for high accuracy
- ⚛️ Modern React Frontend with Material UI and responsive layout
- 🐍 Flask Backend API serving predictions via REST
- 🎨 Custom typography with Florisha and Boruna fonts
- 📦 Structured, maintainable, and easily deployable

---

## 🖥️ Tech Stack

| Frontend        | Backend        | ML Model     | Styling       |
|----------------|----------------|--------------|----------------|
| React + Vite   | Flask + Python | XGBoost      | Material UI + Custom Fonts |

---

## 🧪 How It Works

### 🌿 Crop Prediction

1. User inputs values for:
   - Primary Macronutrients (N, P, K)
   - Secondary Macronutrients (S, Ca, Mg)
   - Micronutrients (Fe, Zn, etc.)
   - Climate & Soil: Water, Organic Matter, Temperature (°C), Rainfall (cm)

2. The Flask backend loads a trained `xgb_crop_model.pkl` model to compute the best crop(s).

3. Results are displayed instantly on the UI in a stylized card format.

---

### 💧 Fertilizer Prediction

1. User inputs values for:
   - Crop name
   - Lower and Upper bounds for all nutrients (N, P, K, Ca, Mg, S, Fe, Mn, Cu, B, Mo, Zn)
   - Climate & Soil: Soil pH, Rainfall (cm), Humidity (%), Soil Moisture (%), Water Holding Capacity (%)

2. The Flask backend loads the trained `fertilizer_classifier.json` model and encoders.

3. The recommended fertilizer is returned and displayed on the frontend. Input fields are auto-cleared after submission.

---

## 📸 Screenshots

### 🏠 Home Page

![Homepage](screenshots/homepage.jpeg)

### 🌿 Crop Predictor Page

![Crop Predictor](screenshots/predictor1.jpeg)
![Crop Predictor](screenshots/predictor2.jpeg)


### 🌿 Fertilizer Predictor Page

![Fertilizer Predictor](screenshots/Fertilizer1.jpeg)
![Fertilizer Predictor](screenshots/Fertilizer2.jpeg)
![Fertilizer Predictor](screenshots/Fertilizer3.jpeg)


---

## 📁 Project Structure

```
FarmSage/
├── Backend/
│   ├── app.py
│   ├── predictor.py
│   ├── fertilizer_predictor.py
│   ├── model_trainer.py
│   └── Models/      
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── assets/
│   │   └── App.jsx
├── README.md
```

---

## ⚙️ Setup Instructions

### 🔌 Backend

```bash
cd Backend
pip install -r requirements.txt
python app.py
```

### 💻 Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

## 🧠 Future Enhancements

- 🐛 Plant Disease Detection using leaf images
- 🛰️ Satellite & IoT-based crop monitoring
- 🌐 Language support for multilingual farmers

---

## 👨‍💻 Developed By

**Aditya Pratap Saha**

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
```
