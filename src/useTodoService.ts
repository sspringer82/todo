import { Todo, TodoInput } from "./Todo";
import { useTodo } from "./TodoContext";
import produce from 'immer';
import { useCallback } from "react";

type ReturnValue = {
  todos: Todo[],
  getAll(): Promise<Todo[]>,
  remove(id: number): Promise<void>,
  save(todo: TodoInput): Promise<void>,
  getOneById(id: number): Promise<Todo>
}

export default function useTodoService(): ReturnValue {
  const [todos, setTodos] = useTodo();

  return {
    todos,
    getAll: useCallback(async () => {
      const request = await fetch('http://localhost:3001/todo');
      const data = await request.json();
      setTodos(data);
      return data;
    }, [setTodos]),
    async remove(id: number) {
      await fetch(`http://localhost:3001/todo/${id}`, {method: 'DELETE'});
      setTodos((prevTodos) => {
        return produce(prevTodos, (draftState) => {
          draftState.splice(prevTodos.findIndex(todo => todo.id === id), 1);
        });
      })
    },
    async getOneById(id: number): Promise<Todo> {
      let todo = todos.find(item => item.id === id);
      if (todo === undefined) {
        const todos = await this.getAll();
        todo = todos.find(item => item.id === id);
      }
      return todo!;
    },
    async save(todo: TodoInput) {
      let method = 'POST'
      let url = 'http://localhost:3001/todo';
      if (todo.id) {
        method = 'PUT';
        url += `/${todo.id}`;
      }
      const request = await fetch(url, {method, headers: {'Content-Type': 'Application/json'}, body: JSON.stringify(todo)});
      const result = await request.json();
      setTodos((prevTodos) => produce(prevTodos, (draftState) => {
        if (method === 'POST') {
          draftState.push(result);
        } else {
          draftState[result.id] = result;
        }
      }));
    }
  }
}