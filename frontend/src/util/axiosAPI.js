import axios from 'axios';

const accessToken = localStorage.getItem("access_token");

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 5000,
  headers: {
    'Authorization': accessToken ? "JWT " + accessToken : null,
    'Content-Type': 'application/json',
    'accept': 'application/json'
  }
});

export default axiosInstance;