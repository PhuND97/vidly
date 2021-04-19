import axios from "axios";
import config from "../config.json";

export function getGenres() {
  return axios.get(config.apiUrl + "/genres");
}
