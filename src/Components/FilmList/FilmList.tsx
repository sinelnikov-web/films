import Header from "../Header/Header";
import MainContainer from "../MainContainer/MainContainer";
import FilmCard from "./FilmCard/FilmCard";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getFilms, getGenres} from "../../redux/film-list-reducer";
import {AppStateType} from "../../redux/store";
import Pagination from "./Pagination/Pagination";
import Loader from "../Loader/Loader";

const FilmList = () => {

    const data = useSelector((state: AppStateType) => state.filmList)

    const films = data.results

    const [currentPage, setCurrentPage] = useState(1)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getFilms(currentPage))
    }, [currentPage])

    return (
        <div>
            <Header>
                <nav className="nav">
                    <Pagination
                        totalCount={data.total_results}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        pageNeighbours={1}
                    />
                </nav>
            </Header>
            <MainContainer>
                {data.isFetching && data.genres.length !== 0 ?
                    <Loader/>
                    :
                    <div className="films-container">
                        {films.map(film => {
                            return (
                                <FilmCard
                                    key={film.id}
                                    src={film.poster_path}
                                    rating={film.vote_average}
                                    lang={film.original_language}
                                    title={film.title}
                                    year={film.release_date}
                                    filmId={film.id}
                                    currentPage={currentPage}
                                    genres={data.genres.map(genre => {
                                        if (film.genre_ids.includes(genre.id)) {
                                            return genre.name
                                        }
                                        return ''
                                    })}
                                />
                            )
                        })}
                    </div>
                }
            </MainContainer>
        </div>
    );
};

export default FilmList;