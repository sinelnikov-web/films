import React, {useState} from 'react';
import star from '../../../assets/images/star.png'
import LazyImage from "../../LazyImage/LazyImage";
import {Link} from "react-router-dom";

interface FilmCardProps {
    src: string
    rating: number
    lang: string
    title: string
    year: string
    filmId: number
    currentPage: number
    genres: Array<string>
}

const FilmCard: React.FC<FilmCardProps> = ({src, title, lang, rating, year, filmId, currentPage, genres}) => {

    const [showInfo, setShowInfo] = useState(false)

    const onMouseOver = () => {
        setShowInfo(true)
    }

    const onMouseLeave = () => {
        setShowInfo(false)
    }

    return (
        <div onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} className="film-card">
            <div className="film-card__main">
                <LazyImage src={'https://image.tmdb.org/t/p/w500' + src} alt={title}/>
                <div className={"films-card__info" + (showInfo ? ' show' : '')}>
                    <div className="film-card__rating">
                        <img className="star" src={star} alt=""/>
                        <span className="rating">{rating}</span>
                    </div>
                    <span className="film-card__lang">{genres.filter(g => g ? g : false).join(', ')}</span>
                    <Link to={`/films/${currentPage}/${filmId}`} className="film-card__button">More</Link>
                </div>
            </div>
            <div className="film-card__footer">
                <h2 className="film-card__title">{title}</h2>
                <span className="film-card__year">{year}</span>
            </div>
        </div>
    );
};

export default FilmCard;