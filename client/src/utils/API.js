import axios from "axios";

const API = {
  login: (username, password) => {
    return axios.post("/api/login", { username, password });
  },
}
export default API;
