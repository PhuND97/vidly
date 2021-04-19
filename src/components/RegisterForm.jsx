import React, { useState } from "react";
import Joi from "joi-browser";
import {
  validate,
  validateProperty,
  renderButton,
  renderInput,
} from "../utils/validateForm";
import { register } from "../services/userService";
import auth from "../services/authService";

function RegisterForm(props) {
  const [data, setData] = useState({ username: "", password: "", name: "" });
  const [errors, setErrors] = useState({});

  const schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validate(data, schema);
    setErrors(newErrors);
    if (newErrors) return;
    try {
      const response = await register(data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const localErrors = { ...errors };
        localErrors.username = ex.response.data;
        setErrors(localErrors);
      }
    }
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
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        {renderInput("username", "Username", handleChange, data, errors)}
        {renderInput(
          "password",
          "Password",
          handleChange,
          data,
          errors,
          "password"
        )}
        {renderInput("name", "Name", handleChange, data, errors)}
        {renderButton("Register", data, schema)}
      </form>
    </div>
  );
}

export default RegisterForm;
