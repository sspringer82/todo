import React, { useState } from 'react';
import { List, ListItem, Divider, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, MenuButton, Drawer } from './Menu.styles';
import Search from '../todo/components/Search/Search';
import Done from './Done';
import ShowOnlyStars from './Star';
import { useDispatch, useSelector } from 'react-redux';
import { getLists } from '../list/selectors/list.selector';
import TodoList from './List';
import Form from '../list/components/Form';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { List as ListType } from '../shared/List';
import {
  getSettings,
  getActiveList,
} from '../settings/selectors/settings.selector';
import { saveSettingsAction } from '../settings/actions/settings.actions';
import update from 'immutability-helper';
import { logoutAction } from '../login/actions/login.actions';
import CachedIcon from '@material-ui/icons/Cached';

import {version} from '../../package.json';

const Menu: React.FC = () => {
  const dispatch = useDispatch();
  const lists = useSelector(getLists);
  const currentList = useSelector(getActiveList);
  const [menuOpen, setMenuOpen] = useState(false);
  function handleSelect(list: ListType | null) {
    dispatch(
      saveSettingsAction.request(
        update(settings, { list: { $set: (list && list.id) || undefined } }),
      ),
    );
    setMenuOpen(false);
  }
  const settings = useSelector(getSettings);
  function handleReload() {
    window.location.reload();
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
          onClick={() => setMenuOpen((prevState) => !prevState)}
        >
          <MenuIcon />
        </MenuButton>
        <Search />
        <h1>{currentList !== null ? currentList.name : 'Todo List'}</h1>
        <IconButton aria-label="reload" onClick={handleReload}>
          <CachedIcon />
        </IconButton>
      </AppBar>
      <Drawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        classes={{ paper: 'paper' }}
      >
        <List>
          <ListItem>
            <Done
              hideDone={settings.hideDone}
              onChange={(hideDone: boolean) => {
                dispatch(
                  saveSettingsAction.request(
                    update(settings, { hideDone: { $set: hideDone } }),
                  ),
                );
              }}
            />
          </ListItem>
          <ListItem>
            <ShowOnlyStars
              onlyStars={settings.onlyStars}
              onChange={(onlyStars: boolean) => {
                dispatch(
                  saveSettingsAction.request(
                    update(settings, { onlyStars: { $set: onlyStars } }),
                  ),
                );
              }}
            />
          </ListItem>
          <Divider />

          <TodoList
            list={{ id: 0, name: 'Alle' }}
            isAll={true}
            onSelect={handleSelect}
          />
          {lists.map((list) => (
            <TodoList
              key={list.id}
              list={list}
              isAll={false}
              onSelect={handleSelect}
            />
          ))}
          <ListItem>
            <Link to="/list/new" style={{ textDecoration: 'none' }}>
              <Button onClick={() => setMenuOpen(false)}>neue Liste</Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/list/new" style={{ textDecoration: 'none' }}>
              <Button onClick={() => dispatch(logoutAction())}>abmelden</Button>
            </Link>
          </ListItem>
          <ListItem>
            Version: {version}
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Menu;
