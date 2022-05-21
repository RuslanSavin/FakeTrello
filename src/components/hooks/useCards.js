import {useDispatch, useSelector} from "react-redux";
import {selectCards} from "../../redux/selectors";
import {useEffect} from "react";
import {fetchCards} from "../../redux/actions";
import {useTrelloService} from "./useTrelloService";

export const useCards = () => {
  const trelloService = useTrelloService();
  const { cards, loading } = useSelector(selectCards);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCards(trelloService, dispatch);
  }, [dispatch, trelloService]);

  return {cards, loading}
}
