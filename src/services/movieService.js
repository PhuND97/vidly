import axios from "axios";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/movies";

function getMovieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
  return axios.get(apiEndpoint);
}

export function getMovie(movieId) {
  return axios.get(getMovieUrl(movieId));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return axios.put(getMovieUrl(movie._id), body);
  }

  return axios.post(apiEndpoint, movie);
}

export function deleteMovie(movieId) {
  return axios.delete(getMovieUrl(movieId));
}
