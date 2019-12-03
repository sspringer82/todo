import React, { ChangeEvent } from 'react';
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
import useForm from './useForm';
import moment, { Moment } from 'moment';
import { DateTimePicker } from '@material-ui/pickers';

const Form: React.FC = () => {
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
          <hr />
          <DateTimePicker
            clearable
            value={todo.due}
            onChange={(date: Moment | null) =>
              handleChange(({
                currentTarget: {
                  name: 'due',
                  value: date ? date.format() : null,
                },
              } as unknown) as ChangeEvent<HTMLInputElement>)
            }
            name="due"
            helperText="Zu erledigen bis"
          />
          <hr />
          <div>{moment(todo.createdAt).format('DD.MM.YYYY hh:mm:ss')}</div>
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
