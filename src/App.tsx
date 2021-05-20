import React from 'react';
import List from './list/List.container';
import Form from './form/Form.container';
import { TodoProvider } from './TodoContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Detail from './detail/Detail.container';
import Frame from './Frame/Frame';

const App: React.FC = () => {
  return (
    <TodoProvider>
      <Router>
        <div className="flex flex-between gap-2 m-2">
          <List />
          <div>
            <Switch>
              <Route path="/edit/:id">
                <Frame>
                  <Form />
                </Frame>
              </Route>
              <Route path="/detail/:id">
                <Frame>
                  <Detail />
                </Frame>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </TodoProvider>
  );
};

export default App;
