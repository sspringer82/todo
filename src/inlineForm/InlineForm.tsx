import React, { useEffect } from 'react';
import { initialTodo, Todo, TodoInput } from '../Todo';
import useForm from '../useForm';
import Button from '../util/button/Button';
import Input from '../util/input/Input';

export type Props = {
  todo?: Todo;
  onSave: (item: TodoInput) => Promise<void>;
  onCancel: () => void;
};

// @todo generic component?
const InlineForm: React.FC<Props> = ({ todo, onSave, onCancel }) => {
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
    <form onSubmit={handleSubmit} data-testid="inlineForm" className="m-2 flex">
      <Input
        type="text"
        onChange={handleChange}
        value={item.title}
        name="title"
        data-testid="title-input"
      />
      <Button type="submit" data-testid="submit-button" variant="primary">
        save
      </Button>
      <Button
        type="button"
        onClick={() => onCancel()}
        data-testid="cancel-button"
      >
        cancel
      </Button>
    </form>
  );
};

export default InlineForm;
