import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import PostsPage from "./pages/PostsPage";

export const Routes = withRouter(({ props }) => {
  return (
    <Switch>
      <Route path="/feed" component={PostsPage} />
      <Redirect from="/" to="/feed" />
    </Switch>
  );
});

export default Routes;
