import {Link} from 'react-router-dom'

export const ComicsItem = ({id=0, thumbnail='', title='', price=''}) => {
    return ( 
        <li className="comics__item" key={id + Math.random().toFixed(2)}>
              <Link to={`/comics/${id}`}>
                <img
                  src={thumbnail}
                  alt="ultimate war"
                  className="comics__item-img"
                />
                <div className="comics__item-name">{title}</div>
                <div className="comics__item-price">Price: {price}</div>
              </Link>
            </li>
    )
}

