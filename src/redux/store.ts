import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {filmListReducer} from "./film-list-reducer";


let rootReducer = combineReducers({
    filmList: filmListReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

// @ts-ignore
window.__store__ = store

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionTypes<T extends {[key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>

export default store