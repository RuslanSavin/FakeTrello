import React, { useRef } from "react";
import InputWithLabel from "../input-with-label/input-with-label";
import './card-list-item.scss'
import {deleteCard, updateCard} from "../../actions";
import {compose} from "redux";
import withTrelloService from "../hoc";
import {connect} from "react-redux";
import collectFormData from "../../utils/collectFormData";

const CardListItem = ({card, updateCard, deleteCard}) => {
  const { id, title, description } = card;
  const changeForm = useRef(null)

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
          deleteCard(id);
        }}>
        Delete
      </button>
      <form
        className="hidden"
        ref={changeForm}
        onSubmit={(e) => {
          e.preventDefault();
          updateCard(card.id, collectFormData(e));
          changeForm.current.classList.toggle("hidden");
        }}>
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

const mapStateToProps = ({ cardList: { cards, loading } }) => {
  return { cards, loading }
}

const mapDispatchToProps = (dispatch, { trelloService }) => {
  return {
    updateCard: updateCard(trelloService, dispatch),
    deleteCard: deleteCard(trelloService, dispatch)
  }
}

export default compose(
  withTrelloService(),
  connect(mapStateToProps, mapDispatchToProps)
)(CardListItem)