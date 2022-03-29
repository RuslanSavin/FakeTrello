import updateCardList from "./cardList";
import updateStatusList from "./statusList";

const reducer = (state , action) => {
  return {
    statusList: updateStatusList(state, action),
    cardList: updateCardList(state, action)
  }
};

export default reducer;