import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { render } from 'react-dom';
import configureStore from './configureStore';
import { Provider } from 'react-redux';

import { TodoList } from './todo/components/list-container.component';
import { Form as TodoForm } from './todo/components/form-container.component';

const store = configureStore();

render(
  <Provider store={store}>
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/list">List</Link>
          </li>
          <li>
            <Link to="/form">Form</Link>
          </li>
        </ul>

        <hr />

        <Route path="/list" name="list" component={TodoList} />
        <Route path="/form" name="form" component={TodoForm} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
