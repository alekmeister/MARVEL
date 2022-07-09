import './charList.scss';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner';

const TOTAL_MARVEL_PERSONS = 210;

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(TOTAL_MARVEL_PERSONS);
  const [charEnded, setCharEnded] = useState(false);

  const { loading, error, getAllCharacters } = useMarvelService();

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = (offset) => {
    setNewItemLoading(true);
    getAllCharacters(offset).then(onCharListLoaded);
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.lenght < 9) {
      ended = true;
    }

    setCharList((charList) => [...charList, ...newCharList]);
    setNewItemLoading((newItemLoading) => false);
    setOffset((offest) => offest + 9);
    setCharEnded((charEnded) => ended);
  };

  function renderItems(arr) {
    const { activeCharId } = props;
    const items = arr.map((item) => {
      const imgStyle = item.thumbnail.includes('image_not_available')
        ? { objectFit: 'unset' }
        : { objectFit: 'cover' };

      return (
        <li
          key={item.id}
          onClick={() => {
            props.onCharSelected(item.id);
          }}
          tabIndex="0"
          className={
            item.id === activeCharId
              ? 'char__item char__item_selected'
              : 'char__item'
          }
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    // А эта конструкция вынесена для центровки спиннера/ошибки
    return <ul className="char__grid">{items}</ul>;
  }

  const items = renderItems(charList);
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? items : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {content}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ dispaly: charEnded ? 'none' : 'block' }}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
