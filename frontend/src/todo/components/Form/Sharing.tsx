import React, { useEffect } from 'react';
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsersAction } from '../../../user/actions/user.actions';
import { getUsers } from '../../../user/selectors/user.selector';
import { InputTypeTodo } from '../../../shared/Todo';

interface Props {
  tabIndex: number;
  tab: number;
  todo: InputTypeTodo;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | {
          currentTarget: {
            name: string;
            value: string;
          };
        }
  ) => void;
}

const Sharing: React.FC<Props> = ({ tab, tabIndex, todo, handleChange }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUsersAction());
  }, [dispatch]);

  const users = useSelector(getUsers);

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={tab !== tabIndex}
      id={`simple-tabpanel-${tabIndex}`}
      aria-labelledby={`simple-tab-${tabIndex}`}
    >
      <FormControl>
        <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-mutiple-name-label"
          id="demo-mutiple-name"
          name="sharedWith"
          multiple
          value={todo.sharedWith && todo.sharedWith!.map(user => user.id)}
          onChange={e => {
            const data = {
              currentTarget: {
                name: e.target.name as string,
                value: (users.filter(user =>
                  (e.target.value as number[])!.includes(user.id)
                ) as unknown) as string,
              },
            };
            handleChange(data);
          }}
          input={<Input />}
        >
          {users.map(user => (
            <MenuItem key={user.id} value={user.id}>
              {user.username}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Typography>
  );
};

export default Sharing;
