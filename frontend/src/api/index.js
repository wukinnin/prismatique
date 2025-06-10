// src/api/index.js
import axios from 'axios';

// Replace this with your actual backend URL
const API_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

export default apiClient;