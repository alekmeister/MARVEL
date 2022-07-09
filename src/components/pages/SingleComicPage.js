import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner';

import './singleComicPage.scss';
import xMen from '../../resources/img/x-men.png';


const SingleComicPage = () => {
    
    const [comic, setComic] = useState({})
    const [newItemLoading, setNewItemLoading] = useState(false);


    const { comicId } = useParams();
    const { getComic } = useMarvelService()

    useEffect(() =>{
      onRequest(comicId);
    }, [])

    const onRequest = async (comicId) => {
        setNewItemLoading(true);
        const oneComic = await getComic(comicId);
        setComic(oneComic);
        setNewItemLoading(false)
    }

    console.log({ comic });
    const { description, id, language, pageCount, price, thumbnail, title } =
      comic;
    return (
        newItemLoading ? <Spinner /> : 
            
    <div className="single-comic">
      <img src={thumbnail} alt="title" className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <Link to='/comics' className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicPage;
