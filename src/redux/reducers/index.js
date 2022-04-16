import updateCardList from "./cardList";
import updateStatusList from "./statusList";
import {combineReducers} from "redux";

export default combineReducers({
  statusList: updateStatusList,
  cardList: updateCardList
});