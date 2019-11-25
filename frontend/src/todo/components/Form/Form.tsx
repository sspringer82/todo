import React from 'react';
import {
  Switch,
  FormControlLabel,
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import { InputTypeTodo, Todo } from '../../../shared/Todo';
import useForm from './useForm';

interface Props {
  todos: Todo[];
  onSave: (todo: InputTypeTodo) => void;
}

const Form: React.FC<Props> = () => {
  const { todo, handleChange, handleClose, handleSave } = useForm();
  return (
    <Dialog onClose={handleClose} open={true}>
      <DialogTitle>Aufgabe bearbeiten</DialogTitle>
      <DialogContent>
        <form>
          <div>
            <TextField
              label="Aufgabe"
              name="title"
              onChange={handleChange}
              value={todo.title}
            />
          </div>
          <div>
            <FormControlLabel
              control={
                <Switch
                  checked={todo.done}
                  onChange={handleChange}
                  value={true}
                  name="done"
                />
              }
              label="Erledigt"
            />
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <div>
          <Button
            onClick={() => {
              handleSave(todo);
              handleClose();
            }}
          >
            speichern
          </Button>
          <Button color="secondary" onClick={handleClose}>
            abbrechen
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default Form;
