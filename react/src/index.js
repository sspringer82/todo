import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { todoApp } from './todo/reducers';
import { TodoList } from './todo/components/list-container.component';

const store = createStore(todoApp);

render(
  <Provider store={store}>
    <TodoList />
  </Provider>,
  document.getElementById('root'),
);
