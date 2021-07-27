import './App.css';
import {BrowserRouter, Switch, Route, Redirect, HashRouter} from "react-router-dom";
import FilmList from "./Components/FilmList/FilmList";
import FilmDetail from "./Components/FilmDetail/FilmDetail";

function App() {
  return (
    <div className="App">
        <HashRouter>
            <Switch>
                <Route exact path={'/films'} component={FilmList}/>
                <Route exact path={'/films/:currentPage/:filmId'} component={FilmDetail}/>
                <Route path={''}>
                    <Redirect to={'/films'}/>
                </Route>
            </Switch>
        </HashRouter>
    </div>
  );
}

export default App;
