import React, {useEffect} from "react";
import {fetchCards, fetchStatuses} from "../../actions";
import {compose} from "redux";
import withTrelloService from "../hoc";
import {connect} from "react-redux";
import Spinner from "../spinner";
import CardListItem from "../card-list-item";
import NewCard from "../new-card";
import './card-list.scss'
import ErrorIndicator from "../error-indicator";

const CardList = ({status, title, cards}) => {

  return (
    <div className="cardWrapper">
      <h2>{title}</h2>
      <ul>
        {
          cards.filter((card) => card.status === status).map((card) => {
            return (
              <CardListItem key={card.id} card={card}/>
              )
          })
        }
      </ul>
      <NewCard status={status}/>
    </div>
  )
}

const CardListContainer = ({fetchCards, cards, loading, title, status}) => {

  useEffect(() => {
    fetchCards();
  }, []);

  if (loading) {
    return <Spinner/>
  }

  return <CardList title={title} status={status} cards={cards}/>
}





const mapStateToProps = ({ cardList: { cards, loading } }) => {
  return { cards, loading }
}

const mapDispatchToProps = (dispatch, { trelloService }) => {
  return {
    fetchCards: fetchCards(trelloService, dispatch)
  }
}


export default compose(
  withTrelloService(),
  connect(mapStateToProps, mapDispatchToProps)
)(CardListContainer)