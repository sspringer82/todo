import produce from "immer";
import config from "../config";
import { SubtaskInput } from "../Todo";
import { useTodo } from "../TodoContext";

type ReturnValue = {
  save(subtask: SubtaskInput): Promise<void>;
  remove(id: number): Promise<void>;
};

export default function useSubtaskService(): ReturnValue {
  const [, setTodos] = useTodo();
  return {
    async save(subtask: SubtaskInput): Promise<void> {
      let url = "";
      let method = "";
      if (subtask.id) {
        url = config.url.subtask.edit(subtask.id);
        method = "PUT";
      } else {
        url = config.url.subtask.create();
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
          const todo = draftTodos.find((todo) => todo.id === subtask.todoId);
          if (method === "POST") {
            todo?.subtasks?.push(data);
          } else {
            const subtaskIndex = todo?.subtasks?.findIndex(
              (subtask) => subtask.id === data.id
            );
            if (todo && todo.subtasks && subtaskIndex !== undefined) {
              todo.subtasks[subtaskIndex] = data;
            }
          }
        })
      );
    },
    async remove(id: number): Promise<void> {
      await fetch(`http://localhost:3001/subtask/${id}`, { method: "DELETE" });

      setTodos((prevTodos) =>
        produce(prevTodos, (draftTodos) => {
          const todo = draftTodos.find((todo) =>
            todo?.subtasks?.some((subtask) => subtask.id === id)
          );
          const subtaskIndex = todo?.subtasks?.findIndex(
            (subtask) => subtask.id === id
          );

          if (subtaskIndex) {
            todo?.subtasks?.splice(subtaskIndex, 1);
          }
        })
      );
    },
  };
}
