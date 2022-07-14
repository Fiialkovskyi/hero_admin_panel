import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
} from "../components/heroesList/heroesSlice";

export const fetchHeroes = (request) => (dispatch) => {
  dispatch(heroesFetching());
  request("http://localhost:3001/heroes")
    .then((data) => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()));
};

export const setFilters = (filters) => {
  return {
    type: "SET_FILTERS",
    payload: filters,
  };
};

export const setCurrentFilter = (name) => {
  return {
    type: "SET_CURRENT_FILTER",
    payload: name,
  };
};
