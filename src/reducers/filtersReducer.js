const initialState = {
  filters: [],
  currentFilter: "all",
};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILTERS":
      return {
        ...state,
        filters: action.payload,
      };

    case "SET_CURRENT_FILTER":
      return {
        ...state,
        currentFilter: action.payload,
      };
    default:
      return state;
  }
};

export default filtersReducer;
