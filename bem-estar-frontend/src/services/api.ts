import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.140.211.48:3000/api",
  timeout: 15000,
});