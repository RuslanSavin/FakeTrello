const fetchStatuses = (trelloService, dispatch) => {
  dispatch(statusesRequested());
  trelloService
    .getStatuses()
    .then((data) => {
      dispatch(statusesLoaded(data));
    })
    .catch((err) => dispatch(statusesError(err)));
};

const statusesRequested = () => {
  return {
    type: "FETCH_STATUSES_REQUEST",
  };
};

const statusesLoaded = (statuses) => {
  return {
    type: "FETCH_STATUSES_SUCCESS",
    payload: statuses,
  };
};

const statusesError = (error) => {
  return {
    type: "FETCH_STATUSES_FAILURE",
    payload: error,
  };
};

export default fetchStatuses;
