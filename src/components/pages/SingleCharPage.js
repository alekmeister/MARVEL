import './singleCharPage.scss';
import useMarvelService from '../../services/MarvelService';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SingleCharPage = () => {
    const [char, setChar] = useState({})
    
    const {getChar} = useMarvelService()
    const { charName } = useParams();

    useEffect(() => {
      onRequest(charName);
    }, []);

    const onRequest = async (charName) => {
      const char = await getChar(charName);
      setChar(char);
    };

    console.log()

    // return (
    //   <div className="single-comic">
    //     <img src={thumbnail} alt="title" className="single-comic__img" />
    //     <div className="single-comic__info">
    //       <h2 className="single-comic__name">{title}</h2>
    //       <p className="single-comic__descr">{description}</p>
    //       <p className="single-comic__descr">{pageCount}</p>
    //       <p className="single-comic__descr">Language: {language}</p>
    //       <div className="single-comic__price">{price}</div>
    //     </div>
    //     <Link to="/comics" className="single-comic__back">
    //       Back to all
    //     </Link>
    //   </div>
    // );
}

export default SingleCharPage