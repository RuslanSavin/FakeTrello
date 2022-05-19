import React, { useEffect } from "react";
import { fetchCards } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../spinner";
import CardListItem from "../card-list-item";
import NewCard from "../new-card";
import "./card-list.scss";
import { useTrelloService } from "../hooks";
import { selectCards } from "../../redux/selectors";

const CardList = ({ status, title, cards }) => {
  return (
    <div className="cardWrapper">
      <h2>{title}</h2>
      <ul>
        {cards
          .filter((card) => card.status === status)
          .map((card) => {
            return <CardListItem key={card.id} card={card} />;
          })}
      </ul>
      <NewCard status={status} />
    </div>
  );
};

const CardListContainer = ({ title, status }) => {
  const trelloService = useTrelloService();
  const { cards, loading } = useSelector(selectCards);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCards(trelloService, dispatch);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return <CardList title={title} status={status} cards={cards} />;
};

/*const mapStateToProps = ({ cardList: { cards, loading } }) => {
  return { cards, loading }
}

const mapDispatchToProps = (dispatch, { trelloService }) => {
  return {
    fetchCards: fetchCards(trelloService, dispatch)
  }
}*/

export default CardListContainer;
