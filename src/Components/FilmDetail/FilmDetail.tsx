import React, {useEffect} from 'react';
import Header from "../Header/Header";
import backImg from "../../assets/images/back.png"
import starImg from "../../assets/images/star.png"
import LazyImage from "../LazyImage/LazyImage";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {useParams} from "react-router-dom"
import Comments from "./Comments/Comments";
import MainContainer from "../MainContainer/MainContainer";
import {Link} from "react-router-dom";
import {getFilms, getGenres} from "../../redux/film-list-reducer";
import Loader from "../Loader/Loader";

interface ParamsType {
    filmId: string
    currentPage: string
}

const FilmDetail = () => {

    let {filmId, currentPage} = useParams<ParamsType>()

    let data = useSelector((state:AppStateType) => state.filmList)

    let film = data.results.filter(film => film.id === parseInt(filmId))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getFilms(parseInt(currentPage)))
    }, [])

    return (
        <div>
            <Header title={film[0].title}>
                <nav className="nav">
                    <Link to={'/films'} className="back-button">
                        <img src={backImg} alt=""/>
                    </Link>
                </nav>
            </Header>
            <MainContainer>
                {data.isFetching || film[0] === undefined ?
                    <Loader/>
                    :
                    <div className="film-block">
                        <div className="film__image">
                            <div className="film__rating">
                                <img className="star" src={starImg} alt=""/>
                                <span className="rating">{film[0].vote_average}</span>
                            </div>
                            <LazyImage src={'https://image.tmdb.org/t/p/original' + film[0].poster_path} alt=""/>
                        </div>
                        <div className="film__main">
                            <h1 className="film__title">{film[0].title}</h1>
                            <p className="film__year">{film[0].release_date}</p>
                            <ul className="film__genres-list">
                                {data.genres.map(genre => {
                                        if (film[0].genre_ids.includes(genre.id)) {
                                            return <li key={genre.id} className="film__genres-item">{genre.name}</li>
                                        }
                                        return ''
                                    })}
                            </ul>
                            <h2 className="film__subtitle">Synopsis</h2>
                            <p className="film__description">{film[0].overview}</p>
                            <h2 className="film__subtitle">Comments</h2>
                            <Comments filmId={parseInt(filmId)}/>
                        </div>
                    </div>
                }
            </MainContainer>
        </div>
    );
};

export default FilmDetail;