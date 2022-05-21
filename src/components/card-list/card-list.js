import React from "react";
import Spinner from "../spinner";
import CardListItem from "../card-list-item";
import NewCard from "../new-card";
import "./card-list.scss";
import {useCards} from "../hooks/useCards";

const CardList = ({ status, title}) => {

  const { loading, cards } = useCards();

  if (loading) {
    return <Spinner />;
  }

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


export default CardList;
