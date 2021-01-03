import styled from 'styled-components';
import { AppBar as MUIAppBar, IconButton, Drawer as MUIDrawer } from '@material-ui/core';

export const AppBar = styled(MUIAppBar)`
  && {
    flex-direction: row;
    flex-grow: 1;
  }

  & h1 {
    flex-grow: 1;
    text-align: center;
    font-size: 1.5em;
  }
`;

export const MenuButton = styled(IconButton)`
  && {
    margin-left: 8px;
  }
`;

export const Drawer = styled(MUIDrawer)`
 
`;
