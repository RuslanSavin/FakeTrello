const deleteCard = (trelloService, dispatch) => (id) => {
  dispatch(deleteCardRequested());
  trelloService
    .deleteCard(id)
    .then((card) => {
      dispatch(deleteCardLoaded(card));
    })
    .catch((err) => dispatch(deleteCardError(err)));
};

const deleteCardRequested = () => {
  return {
    type: "DELETE_CARD_REQUEST",
  };
};

const deleteCardLoaded = (card) => {
  return {
    type: "DELETE_CARD_SUCCESS",
    payload: card,
  };
};

const deleteCardError = (error) => {
  return {
    type: "DELETE_CARD_FAILURE",
    payload: error,
  };
};

export default deleteCard;
