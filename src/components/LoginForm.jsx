import React, { useState } from "react";
import Joi from "joi-browser";
import {
  validate,
  validateProperty,
  renderButton,
  renderInput,
} from "../utils/validateForm";
import auth from "../services/authService";

function LoginForm(props) {
  const [data, setData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validate(data, schema);
    setErrors(newErrors);
    if (newErrors) return;

    try {
      await auth.login(data.username, data.password);
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
      <h1>Login</h1>
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
        {renderButton("Login", data, schema)}
      </form>
    </div>
  );
}

export default LoginForm;
