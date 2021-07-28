import {InferActionTypes} from "./store";
import {Dispatch} from "redux";
import {filmListAPI} from "../api/film-list-api";

const GET_FILMS_SUCCESS = 'GET_FILMS_SUCCESS'
const GET_GENRES_SUCCESS = 'GET_GENRES_SUCCESS'
const START_FETCHING = 'START_FETCHING'
const STOP_FETCHING = 'STOP_FETCHING'

type MovieType = {
    adult: boolean,
    backdrop_path: string,
    genre_ids: Array<number>,
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
}

export type GenreType = {
    id: number
    name: string
}

const initialState = {
    total_results: 500 as null | number,
    total_pages: 500 as null | number,
    page: null as null | number,
    results: [] as Array<MovieType>,
    isFetching: 0,
    genres: [] as Array<GenreType>
}

export type InitialStateType = typeof initialState

export const filmListReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    const {type, payload} = action
    switch (type) {
        case GET_FILMS_SUCCESS: {
            return {...state, ...payload, genres: [...state.genres]}
        }
        case START_FETCHING: {
            return {...state, isFetching: state.isFetching + 1}
        }
        case STOP_FETCHING: {
            return {...state, isFetching: state.isFetching - 1}
        }
        case GET_GENRES_SUCCESS: {
            if (payload !== null) {
                return {...state, genres: [...(payload.genres as Array<GenreType>)]}
            }
            return state
        }
        default: {
            return state
        }
    }
}

type ActionsTypes = InferActionTypes<typeof actions>

export const actions = {
    getFilmsSuccess: (payload: InitialStateType) => {
        return {
            type: GET_FILMS_SUCCESS,
            payload
        }
    },
    startFetching: () => {
        return {
            type: START_FETCHING,
            payload: null
        }
    },
    stopFetching: () => {
        return {
            type: STOP_FETCHING,
            payload: null
        }
    },
    getGenresSuccess: (payload: Array<GenreType>) => {
        return {
            type: GET_GENRES_SUCCESS,
            payload: {
                ...initialState,
                genres:  [...payload]
            } as InitialStateType
        }
    }
}

export const getFilms = (pageNumber: number) => async (dispatch: Dispatch) => {
    dispatch(actions.startFetching())
    const response = await filmListAPI.getFilms(pageNumber)
    dispatch(actions.getFilmsSuccess(response))
    dispatch(actions.stopFetching())
}

export const getGenres = () => async (dispatch: Dispatch) => {
    dispatch(actions.startFetching())
    if (!localStorage.getItem('genres_list')) {
        const response = await filmListAPI.getGenres()
        localStorage.setItem('genres_list', JSON.stringify(response.genres))
    }
    let genres = JSON.parse(localStorage.getItem('genres_list') as string)
    dispatch(actions.getGenresSuccess(genres))
    dispatch(actions.stopFetching())
}