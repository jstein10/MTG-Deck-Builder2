import React from 'react';
import NavBar from './components/NavBar.FComponent';
import { Router, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import history from "./utils/history";
import Main from './views/Main';
import './App.css';

function App() {

  return (
    <div className="App">
      <div>
        <Router history={history}>
          <header>
            <NavBar />
          </header>
          <Switch>
            <Route path="/" exact component={Main}/>
            <PrivateRoute path="/profile" exact component={Profile} />
            <PrivateRoute path='/login' exact component={Main} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;

