import axios from "axios";

// Instance axios partagée dans toute l'app
const api = axios.create({
  baseURL: "http://localhost:8080", // ← ton URL backend
  timeout: 10000, // 10 secondes max
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
