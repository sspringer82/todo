import React from "react";
import Form from "./list/Form";
import List from "./list/List";
import { TodoProvider } from "./TodoContext";

const App: React.FC = () => {
  return (
    <TodoProvider>
      <List />
      <Form />
    </TodoProvider>
  );
};

export default App;
