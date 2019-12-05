import React from 'react';
import { List as ListType } from '../shared/List';
import { Button } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectListAction } from '../list/actions/list.actions';
import { ListItem } from './List.styles';
import { getActiveList } from '../list/selectors/list.selector';
import classnames from 'classnames';

interface Props {
  list: ListType;
}

const List: React.FC<Props> = ({ list }) => {
  const dispatch = useDispatch();
  const activeList = useSelector(getActiveList);
  return (
    <ListItem
      className={classnames({
        active: activeList !== null && activeList.id === list.id,
      })}
      button={true}
    >
      <Button onClick={() => dispatch(selectListAction(list))}>
        {list.name}
      </Button>
      <Link to={`/list/edit/${list.id}`}>
        <SettingsIcon />
      </Link>
    </ListItem>
  );
};

export default List;
