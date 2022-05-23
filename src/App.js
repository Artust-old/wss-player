import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";

import store from "./store";

import Play from "./components/play/Play";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

const App = () => {
  return (
    <StoreProvider store={store}>
      <Router basename={process.env.REACT_APP_BASENAME}>
        <Switch>
          <Route path="/play">
            <Play />
          </Route>
          <Route path="/">
            <Redirect to="/play" />
          </Route>
        </Switch>
      </Router>
      <button
        id="play-toggle"
        type="button"
        className="btn"
        style={{
          width: 200,
          justifyContent: "center",
          display: "flex",
          margin: "auto",
        }}
        onClick={(e) => window.location.reload()}
      >
        Reload
      </button>
    </StoreProvider>
  );
};

export default App;
