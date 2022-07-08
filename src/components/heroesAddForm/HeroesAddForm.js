import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { addHero } from "../../actions";

const HeroesAddForm = () => {
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const { request } = useHttp();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [element, setElement] = useState("");

  const handleNameChange = useCallback(
    (e) => {
      setName(e.target.value);
    },
    [setName]
  );

  const handleDescriptionChange = useCallback(
    (e) => {
      setDescription(e.target.value);
    },
    [setDescription]
  );

  const handleElementChange = useCallback(
    (e) => {
      setElement(e.target.value);
    },
    [setElement]
  );

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const hero = {
        id: uuidv4(),
        name,
        description,
        element,
      };
      request("http://localhost:3001/heroes", "POST", JSON.stringify(hero))
        .then(() => {
          dispatch(addHero(hero));
          setName("");
          setDescription("");
          setElement("");
        })
        .catch((e) => console.error(e));
    },
    [name, description, element, request, dispatch]
  );

  return (
    <form className='border p-4 shadow-lg rounded' onSubmit={handleFormSubmit}>
      <div className='mb-3'>
        <label htmlFor='name' className='form-label fs-4'>
          Имя нового героя
        </label>
        <input
          value={name}
          onChange={handleNameChange}
          required
          type='text'
          name='name'
          className='form-control'
          id='name'
          placeholder='Как меня зовут?'
        />
      </div>

      <div className='mb-3'>
        <label htmlFor='text' className='form-label fs-4'>
          Описание
        </label>
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          required
          name='text'
          className='form-control'
          id='text'
          placeholder='Что я умею?'
          style={{ height: "130px" }}
        />
      </div>

      <div className='mb-3'>
        <label htmlFor='element' className='form-label'>
          Выбрать элемент героя
        </label>
        <select
          required
          className='form-select'
          id='element'
          name='element'
          value={element}
          onChange={handleElementChange}
        >
          {filters.map(({ value, label }) => {
            if (value === "all") {
              return (
                <option key={value} value='' disabled>
                  Я владею элементом...
                </option>
              );
            }

            return (
              <option key={value} value={value}>
                {label}
              </option>
            );
          })}
        </select>
      </div>

      <button type='submit' className='btn btn-primary'>
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
