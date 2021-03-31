import React from "react";
import Form from "./list/Form";
import List from "./list/List";
import EditForm from "./Form";
import { TodoProvider } from "./TodoContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <TodoProvider>
      <Router>
        <List />
        <Form />

        <Switch>
          <Route path="/edit/:id">
            <EditForm />
          </Route>
        </Switch>
      </Router>
    </TodoProvider>
  );
};

export default App;
