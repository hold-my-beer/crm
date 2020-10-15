import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../auth/Login';

const Routes = () => {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  );
};

export default Routes;
