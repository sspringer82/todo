import styled from 'styled-components';
import { AppBar as MUIAppBar } from '@material-ui/core';

export const AppBar = styled(MUIAppBar)`
  && {
    flex-direction: row;
    flex-grow: 1;
  }

  & h1 {
    flex-grow: 1;
    text-align: center;
  }
`;
