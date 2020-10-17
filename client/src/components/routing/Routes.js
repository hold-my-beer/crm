import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Navs from '../layout/Navs';
import Login from '../auth/Login';
import ChangePassword from '../auth/ChangePassword';
import Dashboard from '../dashboard/Dashboard';
import Alert from '../layout/Alert';

const Routes = () => {
  return (
    <Fragment>
      <Navs />
      <div className="container">
        <Alert />
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute
            exact
            path="/change-password"
            component={ChangePassword}
          />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </Fragment>
  );
};

export default Routes;
