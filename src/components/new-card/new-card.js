import React from "react";
import { createCard } from "../../redux/actions";
import { useDispatch } from "react-redux";
import "./new-card.scss";
import { useTrelloService } from "../hooks/useTrelloService";
import { useForm } from "react-hook-form";
import { validationRules } from "../../validation-rules";

const NewCard = React.memo(({ status }) => {
  const trelloService = useTrelloService();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    createCard(trelloService, dispatch)({ ...data, status: status });
    reset();
  };

  return (
    <div className="newCardWrapper">
      <h5 className="newCardHeader">Create new card</h5>
      <form className="newCardForm" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">
          Title <span className="required">*</span>
        </label>
        <input
          id="title"
          {...register("title", validationRules.title)}
          type="text"
        />
        {errors.title && <div role="alert">{errors.title.message}</div>}
        <label htmlFor="description">Description</label>
        <textarea id="description" {...register("description")} rows={3} />
        <button>Submit</button>
      </form>
    </div>
  );
});

export default NewCard;
