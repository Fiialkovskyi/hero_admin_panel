const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  filters: [],
  currentFilter: "all",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "HEROES_FETCHING":
      return {
        ...state,
        heroesLoadingStatus: "loading",
      };
    case "HEROES_FETCHED":
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: "idle",
      };
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };
    case "DELETE_HERO":
      const newHeroes = state.heroes.filter(
        (item) => item.id !== action.payload
      );

      return {
        ...state,
        heroes: newHeroes,
      };

    case "SET_FILTERS":
      return {
        ...state,
        filters: action.payload,
      };

    case "ADD_HERO": {
      return {
        ...state,
        heroes: [...state.heroes, action.payload],
      };
    }

    case "SET_CURRENT_FILTER":
      return {
        ...state,
        currentFilter: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
