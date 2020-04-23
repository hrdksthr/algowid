import React, { Suspense, lazy } from "react";
import { observer, inject } from "mobx-react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import ModuleRoutes from "./Modules/";

const Login = lazy(() => import("Modules/Login/Login"));
const Register = lazy(() => import("Modules/Register/Register"));

const Routes = props => {
  return(
  <main>
    <Router>
      <Suspense fallback={<div>...Loading</div>}>
        <Switch>
          <Route
            path="/login"
            exact
            render={() => (
                <Login {...props} />
            )}
          />
          <Route
            path="/register"
            exact
            render={() => <Register {...props} />}
          />
          <Route path="/" component={ModuleRoutes} />
        </Switch>
      </Suspense>
    </Router>
  </main>
  );
}

export default observer(Routes);
