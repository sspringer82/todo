import React from "react";
import List from "./list/List.container";
import Form from "./form/Form.container";
import { TodoProvider } from "./TodoContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Detail from "./detail/Detail.container";

const App: React.FC = () => {
  return (
    <TodoProvider>
      <Router>
        <List />
        <Switch>
          <Route path="/edit/:id">
            <Form />
          </Route>
          <Route path="/detail/:id">
            <Detail />
          </Route>
        </Switch>
      </Router>
    </TodoProvider>
  );
};

export default App;
