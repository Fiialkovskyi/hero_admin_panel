import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { createSelector } from "reselect";
import "./heroesList.scss";

import { fetchHeroes } from "../../actions";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

const HeroesList = () => {
  const filteredHeroesSelector = createSelector(
    (state) => state.heroes.heroes,
    (state) => state.filters.currentFilter,
    (heroes, currentFilter) => {
      if (currentFilter === "all") {
        return heroes;
      }
      return heroes.filter((item) => item.element === currentFilter);
    }
  );
  const filteredHeroes = useSelector(filteredHeroesSelector);
  const { heroesLoadingStatus } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchHeroes(request));
  }, [request, dispatch]);

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className='text-center mt-5'>Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className='text-center mt-5'>Героев пока нет</h5>;
    }

    return (
      <TransitionGroup className='heroes-list'>
        {arr.map(({ id, ...props }) => {
          return (
            <CSSTransition key={id} classNames='item' timeout={500}>
              <HeroesListItem id={id} {...props} />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    );
  };

  const elements = renderHeroesList(filteredHeroes);
  return <ul>{elements}</ul>;
};

export default HeroesList;
