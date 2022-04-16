const updateCardList = (state = {
  cards: [],
  loading: true,
  error: false
}, action) => {


  const updateCard = (idx, item) => {
    return [
      ...state.cards.slice(0, idx),
      item,
      ...state.cards.slice(idx + 1)
    ]
  }

  const deleteCard = (idx) => {
    return [
      ...state.cards.slice(0, idx),
      ...state.cards.slice(idx + 1)
    ]
  }

  switch (action.type) {

    case 'FETCH_CARDS_REQUEST':
      return {
        cards: [],
        loading: true,
        error: false
      }

    case 'FETCH_CARDS_SUCCESS':
      return {
        cards: action.payload,
        loading: false,
        error: false
      }

    case 'FETCH_CARDS_FAILURE':
      return {
          cards: [],
          loading: false,
          error: true
      }

    case 'UPDATE_CARD_REQUEST':
      return {
        ...state,
        error: false
      }

    case 'UPDATE_CARD_SUCCESS':
      const { id: cardId } = action.payload;
      const cardIndex = state.cards.findIndex(({id}) => id === cardId);

      return {
        ...state,
        cards: updateCard(cardIndex, action.payload),
        error: false
      }

    case 'UPDATE_CARD_FAILURE':

      return {
        ...state,
        error: true
        //TODO implement error case
      }

    case 'CREATE_CARD_REQUEST':
      return {
        ...state,
        error: false
      }

    case 'CREATE_CARD_SUCCESS':
      return {
          ...state,
          cards: [
            ...state.cards,
            action.payload
          ],
          error: false
      }

    case 'CREATE_CARD_FAILURE':

      return {
        ...state,
        error: true
        //TODO implement error case
      }

    case 'DELETE_CARD_REQUEST':
      return {
        ...state,
        error: false
      }

    case 'DELETE_CARD_SUCCESS':
      const { id: idCard } = action.payload;
      const idx = state.cards.findIndex(({id}) => id === idCard);

      return {
        cards: deleteCard(idx),
        error: false
      }

    case 'DELETE_CARD_FAILURE':

      return {
        ...state,
        error: true
        //TODO implement error case
      }

    default:
      return state
  }
}

export default updateCardList;
