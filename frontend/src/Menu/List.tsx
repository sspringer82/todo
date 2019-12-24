import React from 'react';
import { List as ListType } from '../shared/List';
import { Button } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ListItem } from './List.styles';
import { getActiveList } from '../settings/selectors/settings.selector';
import classnames from 'classnames';
import ShareIcon from '@material-ui/icons/Share';

interface Props {
  list: ListType;
  isAll: boolean;
  onSelect: (list: ListType | null) => void;
}

const List: React.FC<Props> = ({ list, isAll, onSelect }) => {
  const activeList = useSelector(getActiveList);

  function isActive() {
    if (isAll && activeList === null) {
      return true;
    }
    return activeList !== null && activeList.id === list.id;
  }
  return (
    <ListItem
      className={classnames({
        active: isActive(),
      })}
      button={true}
    >
      <Button onClick={() => onSelect(isAll ? null : list)}>{list.name}</Button>
      {!isAll && (
        <Link to={`/list/edit/${list.id}`}>
          <SettingsIcon />
        </Link>
      )}
      {list.sharedWith && list.sharedWith.length > 0 && <ShareIcon />}
    </ListItem>
  );
};

export default List;
