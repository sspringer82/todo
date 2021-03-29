import React from "react";
import List from "./List";
import { TodoProvider } from "./TodoContext";

const App: React.FC = () => {
  return (
    <TodoProvider>
      <List />
    </TodoProvider>
  );
};

export default App;
