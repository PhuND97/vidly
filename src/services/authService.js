import axios from "axios";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = config.apiUrl + "/auth";
const tokenKey = "token";

export async function login(email, password) {
  const { data: jwt } = await axios.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
};
