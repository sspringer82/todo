import { useState } from 'react';
import { Todo } from '../../../shared/Todo';

export default function useActiveTodo(): [number | null, (todo: Todo) => void] {
  const [activeTodo, setActiveTodo] = useState<number | null>(null);

  function activate(todo: Todo): void {
    let activeId = todo.id;
    if (activeTodo === activeId) {
      setActiveTodo(null);
    } else {
      setActiveTodo(activeId);
    }
  }

  return [activeTodo, activate];
}
