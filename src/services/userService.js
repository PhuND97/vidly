import axios from "axios";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/users";

export function register(user) {
  return axios.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
