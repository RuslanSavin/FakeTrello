import {useTrelloService} from "./useTrelloService";
import {useDispatch, useSelector} from "react-redux";
import {selectCards, selectStatuses} from "../../redux/selectors";
import {useEffect} from "react";
import {fetchStatuses} from "../../redux/actions";

export const useStatuses = () => {
  const trelloService = useTrelloService();
  const { statuses, loading, error: statusError } = useSelector(selectStatuses);
  const { cardListError } = useSelector(selectCards);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchStatuses(trelloService, dispatch);
  }, [dispatch, trelloService]);

  return {
    statuses,
    loading,
    statusError,
    cardListError
  }
}
