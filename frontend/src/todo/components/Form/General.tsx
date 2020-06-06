import React, { ChangeEvent } from 'react';
import {
  Typography,
  FormControlLabel,
  Switch,
  InputLabel,
  MenuItem,
} from '@material-ui/core';

import moment, { Moment } from 'moment';
import { useSelector } from 'react-redux';
import { getLists } from '../../../list/selectors/list.selector';
import { InputTypeTodo } from '../../../shared/Todo';
import { Select, TextField, DateTimePicker, Divider } from './General.styles';

interface Props {
  todo: InputTypeTodo;
  tabIndex: number;
  tab: number;
  handleChange: (
    e:
      | ChangeEvent<HTMLInputElement>
      | {
          currentTarget: {
            name: string;
            value: string;
          };
        },
  ) => void;
}

const General: React.FC<Props> = ({ todo, tabIndex, tab, handleChange }) => {
  const lists = useSelector(getLists);
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={tab !== tabIndex}
      id={`simple-tabpanel-${tabIndex}`}
      aria-labelledby={`simple-tab-${tabIndex}`}
    >
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
      <Divider />
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
        label="Zu erledigen bis"
      />
      <Divider />
      <div>
        <InputLabel id="list-label">Liste</InputLabel>
        <Select
          labelId="list-label"
          value={todo.list && todo.list.id ? todo.list.id : ''}
          name="list"
          onChange={(e: any) => {
            handleChange({
              currentTarget: {
                name: e.target.name as string,
                value: (lists.find(
                  (list) => list.id === parseInt(e.target.value as string, 10),
                ) as unknown) as string,
              },
            });
          }}
        >
          {lists.map((list) => (
            <MenuItem value={list.id} key={list.id}>
              {list.name}
            </MenuItem>
          ))}
        </Select>
      </div>
      <Divider />
      <div>
        Erstellt am: {moment(todo.createdAt).format('DD.MM.YYYY hh:mm')}
      </div>
    </Typography>
  );
};

export default General;
