import axios from "axios";

const globalAxios = axios.create({
  baseURL: "/api/v1",
});

export default globalAxios;
