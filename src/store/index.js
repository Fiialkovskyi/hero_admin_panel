import { configureStore } from "@reduxjs/toolkit";
import heroes from "../components/heroesList/heroesSlice";
import filtersReducer from "../reducers/filtersReducer";

const stringMiddleware = (store) => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }

  return next(action);
};

const store = configureStore({
  reducer: { heroes, filters: filtersReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

// const store = createStore(
//   combineReducers({ heroes: heroesReducer, filters: filtersReducer }),
//   compose(
//     applyMiddleware(ReduxThunk, stringMiddleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

export default store;
