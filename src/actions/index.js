export const heroesFetching = () => {
  return {
    type: "HEROES_FETCHING",
  };
};

export const heroesFetched = (heroes) => {
  return {
    type: "HEROES_FETCHED",
    payload: heroes,
  };
};

export const heroesFetchingError = () => {
  return {
    type: "HEROES_FETCHING_ERROR",
  };
};

export const deleteHero = (id) => {
  return {
    type: "DELETE_HERO",
    payload: id,
  };
};

export const setFilters = (filters) => {
  return {
    type: "SET_FILTERS",
    payload: filters,
  };
};

export const addHero = (hero) => {
  return {
    type: "ADD_HERO",
    payload: hero,
  };
};

export const setCurrentFilter = (name) => {
  return {
    type: "SET_CURRENT_FILTER",
    payload: name,
  };
};
