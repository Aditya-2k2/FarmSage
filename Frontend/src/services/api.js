// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPredictedCrops = async (formData) => {
  const response = await API.post('/predict', formData);
  return response.data;
};
