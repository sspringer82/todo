import React, { useEffect } from 'react';
import { initialTodo, Todo, TodoInput } from '../Todo';
import useForm from '../useForm';

export type Props = {
  todo?: Todo;
  onSave: (item: TodoInput) => Promise<void>;
  onCancel: () => void;
};

// @todo generic component?
const Form: React.FC<Props> = ({ todo, onSave, onCancel }) => {
  const { handleSubmit, handleChange, item, setItem } = useForm<TodoInput>(
    initialTodo,
    onSave,
  );
  useEffect(() => {
    if (todo) {
      setItem(todo);
    }
  }, [todo, setItem]);

  return (
    <form onSubmit={handleSubmit} data-testid="inlineForm">
      <input
        type="text"
        onChange={handleChange}
        value={item.title}
        name="title"
        data-testid="title-input"
      />
      <button type="submit" data-testid="submit-button">
        save
      </button>
      <button
        type="button"
        onClick={() => onCancel()}
        data-testid="cancel-button"
      >
        cancel
      </button>
    </form>
  );
};

export default Form;
