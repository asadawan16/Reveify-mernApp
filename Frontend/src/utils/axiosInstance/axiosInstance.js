import axios from "axios";
const API = axios.create({
  baseURL: "https://reveify-mern-app-backend.vercel.app/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default API;
