import React, { useContext, useState } from "react";
import { Todo } from "./Todo";

type ContextValue = [Todo[], React.Dispatch<React.SetStateAction<Todo[]>>];

const TodoContext = React.createContext<ContextValue>([[], (e) => e]);

function useTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("Context error");
  }
  return context;
}

type Props = {};

const TodoProvider: React.FC<Props> = (props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const value: ContextValue = React.useMemo(() => [todos, setTodos], [todos]);

  return <TodoContext.Provider value={value} {...props} />;
};

export { TodoProvider, useTodo };
