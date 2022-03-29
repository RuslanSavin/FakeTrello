const updateCardList = (state, action) => {

  if (state === undefined) {
    return {
      cards: [],
      loading: true
    };
  }

  const updateCard = (idx, item) => {
    return [
      ...state.cardList.cards.slice(0, idx),
      item,
      ...state.cardList.cards.slice(idx + 2)
    ]
  }

  const deleteCard = (idx) => {
    return [
      ...state.cardList.cards.slice(0, idx),
      ...state.cardList.cards.slice(idx + 2)
    ]
  }

  switch (action.type) {

    case 'FETCH_CARDS_REQUEST':
      return {
        cards: [],
        loading: true
      }

    case 'FETCH_CARDS_SUCCESS':
      return {
        cards: action.payload,
        loading: false
      }

    case 'FETCH_CARDS_FAILURE':
      return {
          cards: [],
          loading: false
      }

    case 'UPDATE_CARD_REQUEST':
      return {
        ...state.cardList
      }

    case 'UPDATE_CARD_SUCCESS':
      const { id: cardId } = action.payload;
      const cardIndex = state.cardList.cards.findIndex(({id}) => id === cardId);

      return {
        ...state.cardList,
        cards: updateCard(cardIndex, action.payload),
      }

    case 'UPDATE_CARD_FAILURE':

      return {
        ...state.cardList
        //TODO implement error case
      }

    case 'CREATE_CARD_REQUEST':
      return {
        ...state.cardList
      }

    case 'CREATE_CARD_SUCCESS':
      return {
          ...state.cardList,
          cards: [
            ...state.cardList.cards,
            action.payload
          ]
      }

    case 'CREATE_CARD_FAILURE':

      return {
        ...state.cardList
        //TODO implement error case
      }

    case 'DELETE_CARD_REQUEST':
      return {
        ...state.cardList
      }

    case 'DELETE_CARD_SUCCESS':
      const { id: idCard } = action.payload;
      const idx = state.cardList.cards.findIndex(({id}) => id === idCard);

      return {
        cards: deleteCard(idx),
      }

    case 'DELETE_CARD_FAILURE':

      return {
        ...state.cardList
        //TODO implement error case
      }

    default:
      return state.cardList
  }
}

export default updateCardList;
