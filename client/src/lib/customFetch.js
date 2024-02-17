import axios from "axios";

const globalAxios = axios.create({
  baseURL: "https://event-api-r72b.onrender.com/api/v1",
});

export default globalAxios;
