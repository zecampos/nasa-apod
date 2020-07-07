import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favoritos from "./pages/Favoritos";
import Navbar from "./components/Navbar";

export default function Routes() {
  return (
    <Router>
      <>
        <Navbar />

        <Switch>
          <Route path="/favoritos">
            <Favoritos />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </>
    </Router>
  );
}
