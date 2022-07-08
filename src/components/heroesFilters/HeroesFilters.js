import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { useHttp } from "../../hooks/http.hook";
import { setFilters, setCurrentFilter } from "../../actions";

const HeroesFilters = () => {
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const { request } = useHttp();
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    request("http://localhost:3001/filters")
      .then((data) => {
        dispatch(setFilters(data));
      })
      .catch((e) => console.error(e));
  }, [dispatch, request]);

  const handleButtonClick = useCallback(
    (e) => {
      setActiveFilter(e.target.value);
      dispatch(setCurrentFilter(e.target.value));
    },
    [dispatch]
  );

  return (
    <div className='card shadow-lg mt-4'>
      <div className='card-body'>
        <p className='card-text'>Отфильтруйте героев по элементам</p>
        <div className='btn-group'>
          {filters.map(({ label, value }) => {
            return (
              <button
                key={value}
                onClick={handleButtonClick}
                value={value}
                className={classNames({
                  btn: true,
                  "btn-outline-dark": value === "all",
                  "btn-danger": value === "fire",
                  "btn-primary": value === "water",
                  "btn-success": value === "wind",
                  "btn-secondary": value === "earth",
                  active: activeFilter === value,
                })}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;
