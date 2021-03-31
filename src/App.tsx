import React from "react";
import Form from "./list/Form";
import List from "./list/List";
import EditForm from './Form';
import { TodoProvider } from "./TodoContext";

const App: React.FC = () => {
  return (
    <TodoProvider>
      <List />
      <Form />
      <EditForm />
    </TodoProvider>
  );
};

export default App;
