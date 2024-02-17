import axios from "axios";

const globalAxios = axios.create({
  baseURL: "https://events-api-4ho5.onrender.com/api/v1",
});

export default globalAxios;
