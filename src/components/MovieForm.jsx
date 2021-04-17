import React, { useEffect, useState } from "react";
import Joi from "joi-browser";
import {
  validate,
  validateProperty,
  renderButton,
  renderInput,
  renderSelect,
} from "../utils/validateForm";
import { getGenres } from "../services/fakeGenreService";
import { getMovie } from "../services/fakeMovieService";

function MovieForm(props) {
  const [data, setData] = useState({
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: "",
  });

  const [genres, setGenres] = useState([]);
  const [errors, setErrors] = useState({});

  const schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.string()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.string()
      .required()
      .min(0)
      .max(100)
      .label("Daily Rental Rate"),
  };

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validate(data, schema);
    setErrors(newErrors);
    if (errors) return;

    props.history.push("/movies");
  }

  function handleChange(e) {
    const newErrors = { ...errors };
    const { name, value } = e.currentTarget;
    const errorMessage = validateProperty({ name, value }, schema);
    if (errorMessage === null) {
      delete newErrors[e.currentTarget.name];
    } else newErrors[e.currentTarget.name] = errorMessage;

    setErrors(newErrors);

    const newData = { ...data };
    newData[e.currentTarget.name] = e.currentTarget.value;
    setData(newData);
  }

  function mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  useEffect(() => {
    setGenres(getGenres);
    const movieId = props.match.params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return props.history.replace("/not-found");

    setData(mapToViewModel(movie));
  });

  return (
    <div>
      <h1>Movie Form</h1>
      <form onSubmit={handleSubmit}>
        {renderInput("title", "Title", handleChange, data, errors)}
        {renderSelect("genreId", "Genre", handleChange, data, errors, genres)}
        {renderInput(
          "numberInStock",
          "Number in Stock",
          handleChange,
          data,
          errors,
          "number"
        )}
        {renderInput("dailyRentalRate", "Rate", handleChange, data, errors)}

        {renderButton("Save", data, schema)}
      </form>
    </div>
  );
}

export default MovieForm;
