import React, { useEffect } from 'react';
import { initialTodo, Subtask, SubtaskInput, Todo, TodoInput } from '../Todo';
import useForm from '../hooks/useForm';
import Button from '../util/button/Button';
import Input from '../util/input/Input';

export type Props = {
  todo?: Todo | Subtask;
  onSave: (item: TodoInput | SubtaskInput) => Promise<void>;
  onCancel: () => void;
};

// @todo generic component?
const InlineForm: React.FC<Props> = ({ todo, onSave, onCancel }) => {
  const { handleSubmit, handleChange, item, setItem } = useForm<TodoInput | SubtaskInput>(
    initialTodo,
    onSave,
  );
  useEffect(() => {
    if (todo) {
      setItem(todo);
    }
  }, [todo, setItem]);

  return (
    <form
      onSubmit={handleSubmit}
      data-testid={`inline-form${todo ? `-${todo.id}` : ''}`}
      className="flex"
    >
      <Input
        label="Title"
        type="text"
        onChange={handleChange}
        value={item.title}
        name="title"
        data-testid="title-input"
        style={{ width: 230 }}
      />
      <Button
        type="submit"
        data-testid="submit-button"
        variant="primary"
        style={{ marginLeft: 5 }}
      >
        save
      </Button>
      <Button
        type="button"
        onClick={() => {
          setItem(initialTodo);
          onCancel();
        }}
        data-testid="cancel-button"
        style={{ marginLeft: 5 }}
      >
        cancel
      </Button>
    </form>
  );
};

export default InlineForm;
