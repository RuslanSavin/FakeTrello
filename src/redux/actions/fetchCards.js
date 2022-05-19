const fetchCards = (trelloService, dispatch) => {
  dispatch(cardsRequested());
  trelloService
    .getAllCards()
    .then((data) => {
      dispatch(cardsLoaded(data));
    })
    .catch((err) => dispatch(cardsError(err)));
};

const cardsRequested = () => {
  return {
    type: "FETCH_CARDS_REQUEST",
  };
};

const cardsLoaded = (cards) => {
  return {
    type: "FETCH_CARDS_SUCCESS",
    payload: cards,
  };
};

const cardsError = (error) => {
  return {
    type: "FETCH_CARDS_FAILURE",
    payload: error,
  };
};

export default fetchCards;
