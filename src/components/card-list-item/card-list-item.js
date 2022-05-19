import React, { useRef } from "react";
import "./card-list-item.scss";
import { deleteCard, updateCard } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useTrelloService } from "../hooks";
import { useForm } from "react-hook-form";
import { validationRules } from "../../validation-rules";

const CardListItem = ({ card }) => {
  const trelloService = useTrelloService();
  const dispatch = useDispatch();
  const changeForm = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    updateCard(trelloService, dispatch)(card.id, data);
    changeForm.current.classList.toggle("hidden");
    reset();
  };

  return (
    <li>
      <button
        className="changeBtn"
        onClick={() => {
          changeForm.current.classList.toggle("hidden");
        }}
      >
        Change
      </button>
      <button
        className="deleteBtn"
        onClick={() => {
          deleteCard(trelloService, dispatch)(card.id);
        }}
      >
        Delete
      </button>
      <form
        className="hidden"
        ref={changeForm}
        onSubmit={handleSubmit(onSubmit)}
      >
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
        <select defaultValue={card.status} {...register("status")}>
          <option value="to_do">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="testing">Testing</option>
          <option value="done">Done</option>
        </select>
        <button>Submit</button>
      </form>
      <h3 className="cardTitle">{card.title}</h3>
      <p>{card.description}</p>
    </li>
  );
};

export default CardListItem;
