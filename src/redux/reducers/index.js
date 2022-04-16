import updateCardList from "./cardList";
import updateStatusList from "./statusList";
import {combineReducers} from "redux";

/*const reducer = (state , action) => {
  return {
    statusList: updateStatusList(state, action),
    cardList: updateCardList(state, action)
  }
};*/



export default combineReducers({
  statusList: updateStatusList,
  cardList: updateCardList
});