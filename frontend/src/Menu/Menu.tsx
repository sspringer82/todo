import React, { useState } from 'react';
import { Drawer, List, ListItem, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, MenuButton } from './Menu.styles';

const Menu: React.FC = () => {
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
        <h1>Todo App</h1>
      </AppBar>
      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)}>
        <List>
          <ListItem>xxx</ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Menu;
