import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./layouts/Main";
import Login from "./layouts/Login";
import Users from "./layouts/Users";
import NavBar from "./components/ui/NavBar";

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/users/:userId?/:edit?" component={Users} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default App;
