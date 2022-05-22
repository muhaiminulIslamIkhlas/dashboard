import React, { useRef, useState } from "react";
import Input from "../atom/input";
import {
  validate,
  validateProperty,
  handleChangeCommon,
} from "../organism/form";
import Joi from "joi";
import Button from "../atom/button/button";

interface user {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [data, setAccount] = useState<user | any>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({});
  const userName = useRef<HTMLInputElement>(null);

  const rules: any = {
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
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const errors = validate(data, rules);
    setErrors(errors ? errors : {});
    if (errors) {
      console.log(errors);
      return;
    }
    console.log(data);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const hadleChangeData = handleChangeCommon(e, data, errors, rules);
    setErrors(hadleChangeData.error);
    setAccount(hadleChangeData.account);
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
        <Button label="Submit" disabled={validate(data, rules)} />
      </form>
    </div>
  );
};

export default LoginForm;
