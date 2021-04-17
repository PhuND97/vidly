import Joi from "joi-browser";
import Input from "../components/Input";
import Select from "../components/Select";

export function validate(data, schema) {
  const result = Joi.validate(data, schema, { abortEarly: false });
  if (!result.error) return null;

  const localErrors = {};
  for (let item of result.error.details)
    localErrors[item.path[0]] = item.message;

  return localErrors;
}

export function validateProperty({ name, value }, schema) {
  const obj = { [name]: value };
  const newSchema = { [name]: schema[name] };
  const result = Joi.validate(obj, newSchema, { abortEarly: false });
  return result.error ? result.error.details[0].message : null;
}

export function renderButton(label, data, schema) {
  return (
    <button disabled={validate(data, schema)} className="btn btn-primary">
      {label}
    </button>
  );
}

export function renderInput(
  name,
  label,
  handleChange,
  data,
  errors,
  type = "text"
) {
  return (
    <Input
      name={name}
      value={data[name]}
      label={label}
      onChange={handleChange}
      error={errors[name]}
      type={type}
    />
  );
}

export function renderSelect(name, label, handleChange, data, errors, options) {
  return (
    <Select
      name={name}
      value={data[name]}
      label={label}
      options={options}
      onChange={handleChange}
      error={errors[name]}
    />
  );
}
