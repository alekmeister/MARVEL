import './comicsList.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import useMarvelService from '../../services/MarvelService';
import { ComicsItem } from '../comicsitem/ComicsItem';
import Spinner from '../spinner/Spinner';
import { CSSTransition } from 'react-transition-group';

const ComicsList = () => {
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [comics, setComics] = useState([]);
  const [offset, setOffset] = useState(0);

  const { getAllComics } = useMarvelService();
  useEffect(() => {
    onRequest(offset);
  }, []);

  const onRequest = async (offset) => {
    setNewItemLoading(true);
    const allComics = await getAllComics(offset);
    setNewItemLoading(false);
    setComics([...comics, ...allComics]);
  };


  const handleLoadMore = () => {
    const newOffset = offset + 8;
    setOffset(newOffset);
    onRequest(newOffset);
  };

  return (
    <div className="comics__list">
      {newItemLoading ? <Spinner /> :
        <ul className="comics__grid">
          {comics.map((params) => (
            <ComicsItem
              {...params}
            />
          ))}
        </ul>
      }
      <button
        className="button button__main button__long"
        onClick={handleLoadMore}
        disabled={newItemLoading}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
