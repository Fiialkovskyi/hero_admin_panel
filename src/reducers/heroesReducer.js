const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
};

const heroesReducer = (state = initialState, action) => {
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

    case "ADD_HERO": {
      return {
        ...state,
        heroes: [...state.heroes, action.payload],
      };
    }

    default:
      return state;
  }
};

export default heroesReducer;
