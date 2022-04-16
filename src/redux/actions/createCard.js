const createCard = (trelloService, dispatch) => (data) => {
  dispatch(createCardRequested());
  trelloService.createCard(data)
    .then((card) => {
      dispatch(createCardLoaded(card))
    })
    .catch((err) => dispatch(createCardError(err)))
}

const createCardRequested = () => {
  return {
    type: 'CREATE_CARD_REQUEST'
  }
}

const createCardLoaded = (card) => {
  return {
    type: 'CREATE_CARD_SUCCESS',
    payload: card
  }
}

const createCardError = (error) => {
  return {
    type: 'CREATE_CARD_FAILURE',
    payload: error
  }
}

export default createCard;
