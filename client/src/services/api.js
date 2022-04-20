import axios from "axios";
import { API_URL, AUTH_TOKEN } from "../constants/constants";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: AUTH_TOKEN,
  },
});

export default api;
