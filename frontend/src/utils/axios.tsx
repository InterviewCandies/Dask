import axios from "axios";
import { AUTH_TOKEN } from "../types";
const instance = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    Authorization: "Bearer " + localStorage.getItem(AUTH_TOKEN),
  },
});

export default instance;
