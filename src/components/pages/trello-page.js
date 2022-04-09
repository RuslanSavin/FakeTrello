import React, {Component, useEffect} from "react";
import withTrelloService from "../hoc";
import CardList from "../card-list/card-list";
import {fetchStatuses} from "../../actions";
import {compose} from "redux";
import {connect} from "react-redux";
import Spinner from "../spinner";
import './trello-page.scss'
import ErrorIndicator from "../error-indicator";

const TrelloPage = ({ statuses }) => {

  return (
    <div className="trelloWrapper">
      {
        statuses.map((status) => {
        return <CardList key={status.id} title={status.title} status={status.value}/>
        })
      }
    </div>

  )
}

const TrelloPageContainer = ({fetchStatuses, statuses, loading, statusError, cardListError }) => {
  useEffect(() => {
    fetchStatuses();
  }, []);

  if (loading) {
    return <Spinner/>
  }

  return (
    <>
      { (statusError || cardListError) && <ErrorIndicator/> }
      <TrelloPage statuses={statuses}/>
    </>

  )
}

const mapStateToProps = ({ statusList: { statuses, loading, error: statusError }, cardList : { error: cardListError} }) => {
  return { statuses, loading, statusError, cardListError }
}

const mapDispatchToProps = (dispatch, { trelloService }) => {
  return {
    fetchStatuses: fetchStatuses(trelloService, dispatch)
  }
}

export default compose(
  withTrelloService(),
  connect(mapStateToProps, mapDispatchToProps)
)(TrelloPageContainer)