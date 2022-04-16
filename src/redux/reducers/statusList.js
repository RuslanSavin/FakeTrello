const updateStatusList = (state, action) => {

  if (state === undefined) {
    return {
      statuses: [],
      loading: true,
      error: false
    };
  }

  switch (action.type) {
    case 'FETCH_STATUSES_REQUEST':
      return {
        statuses: [],
        loading: true,
        error: false
      }


    case 'FETCH_STATUSES_SUCCESS':
      return {
        statuses: action.payload,
        loading: false,
        error: false
      }

    case 'FETCH_STATUSES_FAILURE':
      return {
        statuses: [],
        loading: false,
        error: true
      }

    default:
      return state.statusList;
  }
}

export default updateStatusList;