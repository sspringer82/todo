import React from 'react';
import { Typography } from '@material-ui/core';
import List from '../Subtask/List';
import { Todo } from '../../../shared/Todo';

interface Props {
  tabIndex: number;
  tab: number;
  todo: Todo;
}

const Subtasks: React.FC<Props> = ({ tab, tabIndex, todo }) => {
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={tab !== tabIndex}
      id={`simple-tabpanel-${tabIndex}`}
      aria-labelledby={`simple-tab-${tabIndex}`}
    >
      <List todo={todo} />
    </Typography>
  );
};

export default Subtasks;
