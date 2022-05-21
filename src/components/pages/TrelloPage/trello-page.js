import React from "react";
import CardList from "../../card-list/card-list";
import Spinner from "../../spinner";
import "./trello-page.scss";
import ErrorIndicator from "../../error-indicator";
import {useStatuses} from "../../hooks/useStatuses";

const TrelloPage = () => {

  const {statuses ,loading, statusError, cardListError } = useStatuses();

  if (loading) {
    return <Spinner />;
  }

  if (statusError || cardListError) {
    return <ErrorIndicator />
  }

  return (
    <div className="trelloWrapper">
      {statuses.map((status) => {
        return (
          <CardList
            key={status.id}
            title={status.title}
            status={status.value}
          />
        );
      })}
    </div>
  );
};

export default TrelloPage;
