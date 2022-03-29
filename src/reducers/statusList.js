const updateStatusList = (state, action) => {

  if (state === undefined) {
    return {
      statuses: [],
      loading: true
    };
  }

  switch (action.type) {
    case 'FETCH_STATUSES_REQUEST':
      return {
        statuses: [],
        loading: true
      }


    case 'FETCH_STATUSES_SUCCESS':
      return {
        statuses: action.payload,
        loading: false
      }

    case 'FETCH_STATUSES_FAILURE':
      return {
        statuses: [],
        loading: false
      }

    default:
      return state.statusList;
  }
}

export default updateStatusList;