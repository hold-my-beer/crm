import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Navs from '../layout/Navs';
import Login from '../auth/Login';
import ChangePassword from '../auth/ChangePassword';
import Dashboard from '../dashboard/Dashboard';
import Alert from '../layout/Alert';
import Opportunities from '../opportunities/Opportunities';
import CreateOpportunity from '../opportunities/CreateOpportunity';
import EditOpportunity from '../opportunities/EditOpportunity';
import Leads from '../leads/Leads';
import CreateLead from '../leads/CreateLead';
import EditLead from '../leads/EditLead';
import Contracts from '../contracts/Contracts';
import CreateContracts from '../contracts/CreateContracts';
import EditContract from '../contracts/EditContract';
import DeleteModal from '../layout/DeleteModal';

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
          <PrivateRoute exact path="/opportunities" component={Opportunities} />
          <PrivateRoute
            exact
            path="/create-opportunity"
            component={CreateOpportunity}
          />
          <PrivateRoute
            exact
            path="/edit-opportunity/:id"
            component={EditOpportunity}
          />
          <PrivateRoute exact path="/leads" component={Leads} />
          <PrivateRoute exact path="/create-lead" component={CreateLead} />
          <PrivateRoute exact path="/edit-lead/:id" component={EditLead} />
          <PrivateRoute exact path="/contracts" component={Contracts} />
          <PrivateRoute
            exact
            path="/create-contracts"
            component={CreateContracts}
          />
          <PrivateRoute
            exact
            path="/edit-contract/:id"
            component={EditContract}
          />
        </Switch>
      </div>
      <PrivateRoute component={DeleteModal} />
    </Fragment>
  );
};

export default Routes;
