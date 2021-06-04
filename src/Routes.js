import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Search } from './components/Search';
import { Details } from './components/Details';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Search} />
      <Route exact path="/repository/:id" component={Details} />
      {/* <Route path="*" component={NotFound} /> */}
    </Switch>
  );
};
