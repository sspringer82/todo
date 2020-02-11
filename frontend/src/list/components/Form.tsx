import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Select,
  InputLabel,
  Input,
  MenuItem,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router';
import update from 'immutability-helper';
import { InputTypeList, List } from '../../shared/List';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../reducers/rootReducer';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteListAction, saveListAction } from '../actions/list.actions';
import { getUsers } from '../../user/selectors/user.selector';
import { loadUsersAction } from '../../user/actions/user.actions';
import { getSettings } from '../../settings/selectors/settings.selector';
import { saveSettingsAction } from '../../settings/actions/settings.actions';
import { TextField, FormControl } from './Form.styles';

const Form: React.FC = () => {
  const params = useParams<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const users = useSelector(getUsers);
  const listName = useRef<HTMLInputElement>(null);

  let initialList: InputTypeList = {
    name: '',
    sharedWith: [],
  };

  const foundList = useSelector((state: AppState) =>
    state.list.lists.find((list: List) => list.id === parseInt(params.id, 10))
  );

  if (foundList) {
    initialList = foundList as InputTypeList;
  }

  const [list, setList] = useState<InputTypeList>(initialList);

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

  function handleShared(
    e: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) {
    const data = users.filter(user =>
      ((e.target.value as unknown) as number[])!.includes(user.id)
    );
    setList((prevTodo: InputTypeList) =>
      update(prevTodo, { sharedWith: { $set: data } })
    );
  }

  useEffect(() => {
    setTimeout(() => {
      listName.current && listName.current!.focus();
    }, 0);
  }, []);

  useEffect(() => {
    dispatch(loadUsersAction.request());
  }, [dispatch]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(saveListAction.request(list));
    handleClose();
  }

  const settings = useSelector(getSettings);
  function handleDelete() {
    dispatch(deleteListAction.request(list as List));
    dispatch(
      saveSettingsAction.request(
        update(settings, { list: { $set: undefined } })
      )
    );
    handleClose();
  }

  return (
    <Dialog onClose={handleClose} open={true}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Liste anlegen/editieren</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              label="Liste"
              name="name"
              onChange={handleChange}
              value={list.name}
              inputRef={listName}
            />
          </div>
          <FormControl>
            <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
            <Select
              labelId="demo-mutiple-name-label"
              id="demo-mutiple-name"
              name="sharedWith"
              multiple
              value={
                (list.sharedWith && list.sharedWith!.map(user => user.id)) || []
              }
              onChange={handleShared}
              input={<Input />}
            >
              {users.map(user => (
                <MenuItem key={user.id} value={user.id}>
                  {user.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
