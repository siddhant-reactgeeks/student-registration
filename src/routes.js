import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Tabs from './scenes/Tabs';

export default () => (
  <Router>
    <Suspense fallback="Loading...">
      <Switch>
      <Route exact path="/" component={Tabs} />
      <Route exact path="/view-student" component={Tabs} />
      <Route exact path="/" component={Tabs} />
      <Route exact path="/view-students" component={Tabs} />
      </Switch>
    </Suspense>
  </Router>
);
