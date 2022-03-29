import React, {Component, useEffect} from "react";
import withTrelloService from "../hoc";
import CardList from "../card-list/card-list";
import {fetchStatuses} from "../../actions";
import {compose} from "redux";
import {connect} from "react-redux";
import Spinner from "../spinner";
import './trello-page.scss'

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

const TrelloPageContainer = ({fetchStatuses, statuses, loading }) => {
  useEffect(() => {
    fetchStatuses();
  }, []);

  if (loading) {
    return <Spinner/>
  }

  return <TrelloPage statuses={statuses}/>
}

const mapStateToProps = ({ statusList: { statuses, loading } }) => {
  return { statuses, loading }
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