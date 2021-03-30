import React from "react";
import Form from "./Form";
import List from "./List";
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
