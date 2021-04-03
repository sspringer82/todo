import produce from "immer";
import { SubtaskInput } from "./Todo";
import { useTodo } from "./TodoContext";

type ReturnValue = {
  save(subtask: SubtaskInput): Promise<void>;
  remove(id: number): Promise<void>;
};

export default function useSubtaskService(): ReturnValue {
  const [, setTodos] = useTodo();
  return {
    async save(subtask: SubtaskInput): Promise<void> {
      console.log("save subtask", subtask);
      let url = "";
      let method = "";
      if (subtask.id) {
        url = `http://localhost:3001/subtask/${subtask.id}`;
        method = "PUT";
      } else {
        url = `http://localhost:3001/subtask`;
        method = "POST";
      }
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(subtask),
      });
      const data = await response.json();

      setTodos((prevTodos) =>
        produce(prevTodos, (draftTodos) => {
          const todo = draftTodos.find((todo) => (todo.id = subtask.todoId));
          if (method === "POST") {
            todo?.subtask?.push(data);
          } else {
            const subtaskIndex = todo?.subtask?.findIndex(
              (subtask) => subtask.id === data.id
            );
            if (todo && todo.subtask && subtaskIndex) {
              todo.subtask[subtaskIndex] = data;
            }
          }
        })
      );
    },
    async remove(id: number): Promise<void> {
      // server call
      await fetch(`http://localhost:3001/subtask/${id}`, { method: "DELETE" });

      // update corresponding todo
      setTodos((prevTodos) =>
        produce(prevTodos, (draftTodos) => {
          const todo = draftTodos.find((todo) =>
            todo?.subtask?.some((subtask) => subtask.id === id)
          );
          const subtaskIndex = todo?.subtask?.find(
            (subtask) => subtask.id === id
          );
          if (subtaskIndex) {
            todo?.subtask?.splice((subtaskIndex as unknown) as number, 1);
          }
        })
      );
    },
  };
}
