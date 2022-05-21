import React from "react";
import { Link } from "react-router-dom";
import { useTrelloService } from "../../hooks/useTrelloService";
import { useForm } from "react-hook-form";

import "./register-page.scss";
import { validationRules } from "../../../validation-rules";

const RegisterPage = ({ setAuth }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { postRegister } = useTrelloService();

  const onSubmit = async (data) => {
    try {
      await postRegister(data);
      setAuth(true);
    } catch (error) {
      setAuth(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="container">
        <label htmlFor="username">
          Login <span className="required">*</span>
        </label>
        <input
          id="username"
          {...register("username", validationRules.identifier)}
          type="text"
        />
        {errors.username && <span role="alert">{errors.username.message}</span>}
        <label htmlFor="email">
          Email <span className="This field is required">*</span>
        </label>
        <input
          id="email"
          {...register("email", validationRules.email)}
          type="email"
        />
        {errors.email && <span role="alert">{errors.email.message}</span>}
        <label htmlFor="password">
          Password <span className="required">*</span>
        </label>
        <input
          id="password"
          {...register("password", validationRules.password)}
          type="password"
        />
        {errors.password && <span role="alert">{errors.password.message}</span>}
        <button type="submit">Submit</button>
        <Link to="/login">To Login Page</Link>
      </form>
    </>
  );
};

export default RegisterPage;
