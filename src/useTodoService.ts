import { Todo, TodoInput } from "./Todo";
import { useTodo } from "./TodoContext";
import produce from "immer";
import { useCallback } from "react";
import config from "./config";

type ReturnValue = {
  todos: Todo[];
  getAll(): Promise<Todo[]>;
  getOneById(id: number): Promise<Todo>;
  save(todo: TodoInput): Promise<void>;
  remove(id: number): Promise<void>;
};

export default function useTodoService(): ReturnValue {
  const [todos, setTodos] = useTodo();

  return {
    todos,
    getAll: useCallback(async () => {
      const request = await fetch(config.url.todo.get());
      const data = await request.json();
      setTodos(data);
      return data;
    }, [setTodos]),
    async getOneById(id: number): Promise<Todo> {
      let todo = todos.find((item) => item.id === id);
      if (todo === undefined) {
        const todos = await this.getAll();
        todo = todos.find((item) => item.id === id);
      }
      return todo!;
    },

    async save(todo: TodoInput) {
      let method = "";
      let url = "";
      if (todo.id) {
        method = "PUT";
        url = config.url.todo.edit(todo.id);
      } else {
        method = "POST";
        url = config.url.todo.create();
      }
      const request = await fetch(url, {
        method,
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(todo),
      });
      const result = await request.json();
      setTodos((prevTodos) =>
        produce(prevTodos, (draftState) => {
          if (method === "POST") {
            draftState.push(result);
          } else {
            const index = draftState.findIndex((item) => item.id === result.id);
            draftState[index] = result;
          }
        })
      );
    },
    async remove(id: number) {
      await fetch(config.url.todo.delete(id), { method: "DELETE" });
      setTodos((prevTodos) => {
        return produce(prevTodos, (draftState) => {
          draftState.splice(
            prevTodos.findIndex((todo) => todo.id === id),
            1
          );
        });
      });
    },
  };
}
