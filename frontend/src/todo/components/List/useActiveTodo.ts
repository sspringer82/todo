import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { Todo } from '../../../shared/Todo';
import useTodoList from './useTodoList';

export default function useActiveTodo(): [Todo | null, (todo: Todo | null) => void] {
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const {handleDelete, handleSave} = useTodoList();
  const history = useHistory();

  const activeTodoRef = useRef<Todo | null>(null);
  activeTodoRef.current = activeTodo;

  const keyboardHandler = useCallback((e: KeyboardEvent) => {
    if (activeTodoRef.current === null) {
      return;
    }
    switch (e.code) {
      case 'KeyE':
        history.push(`/edit/${activeTodoRef.current.id}`)
        break;
      case 'KeyD':
        handleDelete(activeTodoRef.current);
        break;
      case 'KeyS':
        const newValue: Todo = {...activeTodoRef.current, starred: !(activeTodoRef.current.starred)};
        activeTodoRef.current = newValue;
        handleSave(newValue);
        break;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.addEventListener('keydown', keyboardHandler);
    return () => {
      window.removeEventListener('keydown', keyboardHandler);
    }
  }, [keyboardHandler]);

  function activate(todo: Todo | null): void {
    if (todo !== null && activeTodo !== null && activeTodo.id === todo.id) {
      setActiveTodo(null);
    } else {
      setActiveTodo(todo);
    }
  }

  return [activeTodo, activate];
}
