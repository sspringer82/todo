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
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import useForm from './useForm';
import moment, { Moment } from 'moment';
import { DateTimePicker } from '@material-ui/pickers';
import { useSelector } from 'react-redux';
import { getLists } from '../../../list/selectors/list.selector';

const Form: React.FC = () => {
  const { todo, handleChange, handleClose, handleSave } = useForm();

  return (
    <Dialog onClose={handleClose} open={true}>
      <form
        onSubmit={() => {
          handleSave(todo);
          handleClose();
        }}
      >
        <DialogTitle>Aufgabe bearbeiten</DialogTitle>
        <DialogContent>
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
          <InputLabel id="list-label">Liste</InputLabel>
          <Select
            labelId="list-label"
            value={todo.list && todo.list.id ? todo.list.id : ''}
            name="list"
            onChange={e => {
              handleChange({
                currentTarget: {
                  name: e.target.name as string,
                  value: e.target.value as string,
                },
              });
            }}
          >
            {useSelector(getLists).map(list => (
              <MenuItem value={list.id} key={list.id}>
                {list.name}
              </MenuItem>
            ))}
          </Select>
          <hr />
          <div>{moment(todo.createdAt).format('DD.MM.YYYY hh:mm:ss')}</div>
        </DialogContent>
        <DialogActions>
          <div>
            <Button type="submit">speichern</Button>
            <Button color="secondary" onClick={handleClose}>
              abbrechen
            </Button>
          </div>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Form;
