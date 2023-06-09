import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </Router>
  );
};

export default AppRouter;