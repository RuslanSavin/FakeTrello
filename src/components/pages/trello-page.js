import React, {useEffect} from "react";
import CardList from "../card-list/card-list";
import {fetchStatuses} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../spinner";
import './trello-page.scss'
import ErrorIndicator from "../error-indicator";
import {useTrelloService} from "../hooks";
import {selectCards, selectStatuses} from "../../redux/selectors";

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

const TrelloPageContainer = () => {

  const trelloService = useTrelloService();
  const {statuses, loading, error : statusError} = useSelector(selectStatuses);
  const {cardListError} = useSelector(selectCards);
  const dispatch = useDispatch();

  console.log(statuses, loading, statusError);

  useEffect(() => {
    console.log('statuses')
    fetchStatuses(trelloService, dispatch);
    console.log('statuses2')
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

export default TrelloPageContainer;