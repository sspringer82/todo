import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, Divider, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, MenuButton } from './Menu.styles';
import Search from '../todo/components/Search/Search';
import Done from './Done';
import ShowOnlyStars from './Star';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadListsAction,
  selectListAction,
} from '../list/actions/list.actions';
import { getLists } from '../list/selectors/list.selector';
import TodoList from './List';
import Form from '../list/components/Form';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { List as ListType } from '../shared/List';

const Menu: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadListsAction());
  }, [dispatch]);
  const lists = useSelector(getLists);
  const [menuOpen, setMenuOpen] = useState(false);
  function handleSelect(list: ListType | null) {
    dispatch(selectListAction(list));
    setMenuOpen(false);
  }
  return (
    <>
      <Route path="/list/edit/:id">
        <Form />
      </Route>
      <Route path="/list/new">
        <Form />
      </Route>
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

          <TodoList
            list={{ id: 0, name: 'Alle' }}
            isAll={true}
            onSelect={handleSelect}
          />
          {lists.map(list => (
            <TodoList
              key={list.id}
              list={list}
              isAll={false}
              onSelect={handleSelect}
            />
          ))}
          <ListItem>
            <Link to="/list/new">
              <Button onClick={() => setMenuOpen(false)}>neue Liste</Button>
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Menu;
