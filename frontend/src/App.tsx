import React from 'react';
import List from './List/List';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Form from './Form/Form';
import useTodo from './List/useTodo';

const App: React.FC = () => {
  const { todos, save, toggleStatus, remove } = useTodo();

  return (
    <>
      <Router>
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
    </>
  );
};

export default App;
