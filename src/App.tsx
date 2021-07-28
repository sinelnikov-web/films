import './App.css';
import {BrowserRouter, Switch, Route, Redirect, HashRouter} from "react-router-dom";

import {lazy, Suspense} from "react";
import Loader from "./Components/Loader/Loader";

const SuspendedFilmList = lazy(() => import("./Components/FilmList/FilmList"))
const SuspendedFilmDetail = lazy(() => import("./Components/FilmDetail/FilmDetail"))

function App() {
  return (
    <div className="App">
        <HashRouter>
            <Switch>
                <Route exact path={'/films'}>
                    <Suspense fallback={<Loader/>}>
                        <SuspendedFilmList/>
                    </Suspense>
                </Route>
                <Route exact path={'/films/:currentPage/:filmId'}>
                    <Suspense fallback={<Loader/>}>
                        <SuspendedFilmDetail/>
                    </Suspense>
                </Route>
                <Route path={''}>
                    <Redirect to={'/films'}/>
                </Route>
            </Switch>
        </HashRouter>
    </div>
  );
}

export default App;
