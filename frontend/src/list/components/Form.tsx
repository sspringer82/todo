import React, { ChangeEvent, useState, FormEvent } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router';
import update from 'immutability-helper';
import { InputTypeList, List } from '../../shared/List';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../reducers/rootReducer';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteListAction, saveListAction } from '../actions/list.actions';

const Form: React.FC = () => {
  const params = useParams<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();

  function handleClose() {
    history.push('/');
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const field = e.currentTarget.name;
    const value = e.currentTarget.value;

    setList((prevTodo: InputTypeList) =>
      update(prevTodo, { [field]: { $set: value } })
    );
  }

  let initialList: InputTypeList = {
    name: '',
  };

  const foundList = useSelector((state: AppState) =>
    state.list.lists.find((list: List) => list.id === parseInt(params.id, 10))
  );

  if (foundList) {
    initialList = foundList as InputTypeList;
  }

  const [list, setList] = useState<InputTypeList>(initialList);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(saveListAction(list));
    handleClose();
  }

  function handleDelete() {
    dispatch(deleteListAction(list as List));
    handleClose();
  }

  return (
    <Dialog onClose={handleClose} open={true}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Liste anlegen/editieren</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              label="Aufgabe"
              name="name"
              onChange={handleChange}
              value={list.name}
            />
          </div>
        </DialogContent>
        <DialogActions>
          {list.id && (
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          )}
          <Button type="submit">speichern</Button>
          <Button color="secondary" onClick={handleClose}>
            abbrechen
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Form;
