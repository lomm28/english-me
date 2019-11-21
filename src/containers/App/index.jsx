import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LoginForm from '../../components/LoginForm';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => <div>BOO-HA!</div>} />
        <Route path="/login" component={LoginForm} />
        <Route path="/dashboard" component={() => null} />
        <Route path="/my/profile" component={() => null} />
        {/* <Route path="" component={() => null} /> */}
      </Switch>
    </BrowserRouter>
  );
}
