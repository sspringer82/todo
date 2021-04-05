import React from "react";
import List from "./list/List";
import EditForm from "./form/Form";
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
            <EditForm />
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
