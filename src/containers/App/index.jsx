import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';

import history from '../../utils/history';

export default function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={() => <div>BOO-HA!</div>} />
        <Route path="/login" exact component={LoginForm} />
        <Route path="/register" exact component={RegisterForm} />
        <Route path="/dashboard" component={() => <div>My Dashboard</div>} />
        <Route path="/my/profile" component={() => <div>My Profile</div>} />
        {/* <Route path="" component={() => null} /> */}
      </Switch>
    </Router>
  );
}
