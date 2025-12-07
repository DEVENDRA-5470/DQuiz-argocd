import axios from "axios";

const api = axios.create({
  baseURL: "http://3.14.141.236:32000/api", // Backend URL
  withCredentials: true,                // allow cookies/token if used later
});

export default api;
