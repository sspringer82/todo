import React from 'react';
import List from './List/List';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Form from './Form/Form';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <List />
        <Switch>
          <Route path="/edit">
            <Form />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
