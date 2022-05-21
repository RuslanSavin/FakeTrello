import React from "react";
import { Link } from "react-router-dom";
import { useTrelloService } from "../../hooks/useTrelloService";
import { useForm } from "react-hook-form";

import "./login-page.scss";
import { validationRules } from "../../../validation-rules";

const LoginPage = ({ setAuth }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { postLogin } = useTrelloService();

  const onSubmit = async (data) => {
    try {
      await postLogin(data);
      setAuth(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container">
      <label className="label" htmlFor="identifier">
        Login <span className="required">*</span>
      </label>
      <input
        data-testid="identifier"
        id="identifier"
        {...register("identifier", validationRules.identifier)}
        type="text"
      />
      {errors.identifier && (
        <span role="alert">{errors.identifier.message}</span>
      )}
      <label htmlFor="password">
        Password <span className="required">*</span>
      </label>
      <input
        data-testid="password"
        id="password"
        {...register("password", validationRules.password)}
        type="password"
      />
      {errors.password && <span role="alert">{errors.password.message}</span>}
      <button type="submit">Submit</button>
      <Link to="/register">To Register Page</Link>
    </form>
  );
};

export default LoginPage;
