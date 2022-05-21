import React, { useRef, useState } from "react";
import Input from "../atom/input";
import Joi from "joi";

interface user {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [data, setAccount] = useState<user | any>({
    username: "",
    password: "",
  });

  const rules:any = {
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .label("User name"),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required()
      .label("Password"),
  }

  const schema:any = Joi.object(rules);

  const [errors, setErrors] = useState<any>({});
  const userName = useRef<HTMLInputElement>(null);

  const validate = () => {
    const result = schema.validate(data, { abortEarly: false });
    console.log(result);
    if (!result.error) return null;

    const error: any = {};

    for (let item of result.error.details) {
      error[item.path[0]] = item.message;
    }

    return error;
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors ? errors : {});
    if (errors) {
      console.log(errors);
      return;
    }
    console.log(data);
  };

  const validateProperty = ({ name, value }:any) => {
    const obj = { [name]: value };
    const schemaSingle:any = Joi.object({[name] : rules[name]});
    const errorObj = schemaSingle.validate(obj);
    return errorObj.error ? errorObj.error.details[0].message: null;
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const errorClone = { ...errors };
    const errorMessage = validateProperty(e.currentTarget);
    if (errorMessage) {
      errorClone[e.currentTarget.name] = errorMessage;
    } else {
      delete errorClone[e.currentTarget.name];
    }
    setErrors(errorClone);

    const accountClone = { ...data };
    accountClone[e.currentTarget.name] = e.currentTarget.value;
    setAccount(accountClone);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          label="User Name"
          value={data.username}
          onChange={handleChange}
          name="username"
          type="text"
          error={errors.username}
        />
        <Input
          label="User Name"
          value={data.password}
          onChange={handleChange}
          type="password"
          name="password"
          error={errors.password}
        />

        <input disabled={validate()} type="submit" value="submit" />
      </form>
    </div>
  );
};

export default LoginForm;
