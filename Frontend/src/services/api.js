// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // 🔁 Replace with your deployed URL if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🌾 Crop Prediction API
export const getPredictedCrops = async (formData) => {
  const response = await API.post('/predict', formData);
  return response.data;
};

// 🌿 Fertilizer Prediction API
export const getPredictedFertilizer = async (formData) => {
  const response = await API.post('/predict-fertilizer', formData);
  return response.data;
};
