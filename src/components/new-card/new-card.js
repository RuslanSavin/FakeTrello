import React from "react";
import InputWithLabel from "../input-with-label/input-with-label";
import {createCard} from "../../actions";
import {compose} from "redux";
import withTrelloService from "../hoc";
import {connect} from "react-redux";
import './new-card.scss'
import collectFormData from "../../utils/collectFormData";

const NewCard = ({ createCard, status }) => {

  return (
    <div className="newCardWrapper">
      <h3 className="newCardHeader">Create new card</h3>
      <form
        className="newCardForm"
        onSubmit={(e) => {
          e.preventDefault();
          createCard(collectFormData(e).slice(0, -1).concat(`,"status":"${status}"}`));
          e.target.reset();
        }}>
        <InputWithLabel inputName="title" label="Title"/>
        <InputWithLabel inputName="description" label="Description"/>
        <button>Submit</button>
      </form>
    </div>
  )
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch, { trelloService }) => {
  return {
    createCard: createCard(trelloService, dispatch)
  }
}

export default compose(
  withTrelloService(),
  connect(mapStateToProps, mapDispatchToProps)
)(NewCard)