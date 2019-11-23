import React from 'react';
import List from './todo/components/List/List';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Form from './todo/components/Form/Form';
import useTodo from './todo/components/List/useTodo';
import Menu from './Menu/Menu';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

const App: React.FC = () => {
  const { todos, save, toggleStatus, remove } = useTodo();

  return (
    <Provider store={store}>
      <Router>
        <Menu />
        <List
          todos={todos}
          onSave={save}
          onToggleStatus={toggleStatus}
          onRemove={remove}
        />
        <Switch>
          <Route path="/edit/:id">
            <Form todos={todos} onSave={save} />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
