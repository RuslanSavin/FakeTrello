import React from "react";
import InputWithLabel from "../input-with-label/input-with-label";
import {createCard} from "../../redux/actions";
import {useDispatch} from "react-redux";
import './new-card.scss'
import collectFormData from "../../utils/collectFormData";
import {useTrelloService} from "../hooks";

const NewCard = ({ status }) => {

  const trelloService = useTrelloService();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    createCard(trelloService, dispatch)({...collectFormData(e), status: status});
    e.target.reset();
  }

  return (
    <div className="newCardWrapper">
      <h3 className="newCardHeader">Create new card</h3>
      <form
        className="newCardForm"
        onSubmit={handleSubmit}>
        <InputWithLabel inputName="title" label="Title"/>
        <InputWithLabel inputName="description" label="Description"/>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default NewCard