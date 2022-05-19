const updateStatusList = (
  state = {
    statuses: [],
    loading: true,
    error: false,
  },
  action
) => {
  switch (action.type) {
    case "FETCH_STATUSES_REQUEST":
      return {
        statuses: [],
        loading: true,
        error: false,
      };

    case "FETCH_STATUSES_SUCCESS":
      return {
        statuses: action.payload,
        loading: false,
        error: false,
      };

    case "FETCH_STATUSES_FAILURE":
      return {
        statuses: [],
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export default updateStatusList;
