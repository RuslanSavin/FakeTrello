import React, { useRef } from "react";
import InputWithLabel from "../input-with-label/input-with-label";
import './card-list-item.scss'
import {deleteCard, updateCard} from "../../redux/actions";
import {useDispatch} from "react-redux";
import collectFormData from "../../utils/collectFormData";
import {useTrelloService} from "../hooks";

const CardListItem = ({ card }) => {

  const trelloService = useTrelloService();
  const dispatch = useDispatch();
  const { id, title, description } = card;
  const changeForm = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCard(trelloService, dispatch)(card.id, collectFormData(e));
    changeForm.current.classList.toggle("hidden");
    changeForm.current.reset();
  }

  return (
    <li>
      <button
        className="changeBtn"
        onClick={() => {
        changeForm.current.classList.toggle("hidden");
      }}>
        Change
      </button>
      <button
        className="deleteBtn"
        onClick={() => {
          deleteCard(trelloService, dispatch)(id);
        }}>
        Delete
      </button>
      <form
        className="hidden"
        ref={changeForm}
        onSubmit={handleSubmit}>
        <InputWithLabel inputName="title" label="Title"/>
        <InputWithLabel inputName="description" label="Description"/>
        <select name="status">
          <option value="to_do">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="testing">Testing</option>
          <option value="done">Done</option>
        </select>
        <button>Submit</button>
      </form>
      <h3 className="cardTitle">{title}</h3>
      <p>{description}</p>
    </li>
  )
}

export default CardListItem