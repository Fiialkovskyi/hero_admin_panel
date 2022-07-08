import { createStore, combineReducers } from "redux";
import heroesReducer from "../reducers/heroesReducer";
import filtersReducer from "../reducers/filtersReducer";

const store = createStore(
  combineReducers({ heroes: heroesReducer, filters: filtersReducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
