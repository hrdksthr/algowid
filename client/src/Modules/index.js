import React, { Suspense, lazy } from "react";
import { observer, inject } from "mobx-react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthRoutes from "hoc/auth";
const Home = lazy(() => import("./Products"));

const redirect = pathname => () => {
  return <Redirect to={{ pathname }} />;
};

const ModuleRoutes = props => {
  return (
    <main>
      <Suspense fallback={<div>...Loading</div>}>
        <Switch>
          <Route path="/" exact render={redirect("home")} />
          <Route
            path="/home"
            exact
            render={() => <Home {...props} />}
          />
        </Switch>
      </Suspense>
    </main>
  )
}
export default AuthRoutes(inject("users")(observer(ModuleRoutes)));
