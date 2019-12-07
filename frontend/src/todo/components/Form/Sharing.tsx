import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsersAction } from '../../../user/actions/user.actions';
import { getUsers } from '../../../user/selectors/user.selector';

interface Props {
  tabIndex: number;
  tab: number;
}

const Sharing: React.FC<Props> = ({ tab, tabIndex }) => {
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
      {users.map(user => (
        <div key={user.id}>{user.username}</div>
      ))}
    </Typography>
  );
};

export default Sharing;
