import axios from "axios";

// create api so that we use everywhere

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: false,
});

// Attach token automatically

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  //   check if token exists
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
});

export default API;