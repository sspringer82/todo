import { Todo } from "./Todo";
import { useTodo } from "./TodoContext";
import produce from 'immer';

type ReturnValue = {
  todos: Todo[],
  getAll(): Promise<void>,
  remove(id: number): Promise<void>,
}

export default function useTodoService(): ReturnValue {
  const [todos, setTodos] = useTodo();

  return {
    todos,
    async getAll() {
      const request = await fetch('http://localhost:3001/todo');
      const data = await request.json();
      setTodos(data);
    },
    async remove(id: number) {
      await fetch(`http://localhost:3001/todo/${id}`, {method: 'DELETE'});
      setTodos((prevTodos) => {
        return produce(prevTodos, (draftState) => {
          draftState.splice(prevTodos.findIndex(todo => todo.id === id), 1);
        });
      })
    }
  }
}