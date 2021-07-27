import axios from "axios";
import {GenreType} from "../redux/film-list-reducer";

let config = {
    baseURL: 'https://api.themoviedb.org/3/',
}

export const APIInstance = axios.create(config)

export const filmListAPI = {
    getFilms: (pageNumber: number) => {
        return APIInstance.get(
            `discover/movie?api_key=e83980f968c65acc5fe3a21f25c2b408&language=en-US&sort_by=popularity.desc&page=${pageNumber}`).then(r => r.data)
    },
    getGenres: () => {
        return APIInstance.get('/genre/movie/list?api_key=e83980f968c65acc5fe3a21f25c2b408').then(r => r.data)
    }
}