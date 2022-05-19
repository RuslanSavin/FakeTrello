const updateCard = (trelloService, dispatch) => (id, data) => {
  dispatch(updateCardRequested());
  trelloService
    .updateCard(id, data)
    .then((card) => {
      dispatch(updateCardLoaded(card));
    })
    .catch((err) => dispatch(updateCardError(err)));
};

const updateCardRequested = () => {
  return {
    type: "UPDATE_CARD_REQUEST",
  };
};

const updateCardLoaded = (card) => {
  return {
    type: "UPDATE_CARD_SUCCESS",
    payload: card,
  };
};

const updateCardError = (error) => {
  return {
    type: "UPDATE_CARD_FAILURE",
    payload: error,
  };
};

export default updateCard;
