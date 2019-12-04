import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, Divider } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, MenuButton } from './Menu.styles';
import Search from '../todo/components/Search/Search';
import Done from './Done';
import ShowOnlyStars from './Star';
import { useDispatch, useSelector } from 'react-redux';
import { loadListsAction } from '../todo/actions/list.actions';
import { getLists } from '../todo/selectors/list.selector';

const Menu: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadListsAction());
  }, [dispatch]);
  const lists = useSelector(getLists);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <AppBar position="static">
        <MenuButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setMenuOpen(prevState => !prevState)}
        >
          <MenuIcon />
        </MenuButton>
        <Search />
        <h1>Todo App</h1>
      </AppBar>
      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)}>
        <List>
          <ListItem>
            <Done />
          </ListItem>
          <ListItem>
            <ShowOnlyStars />
          </ListItem>
          <Divider />
          <ListItem>Alle</ListItem>
          {lists.map(list => (
            <ListItem>{list.name}</ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Menu;
