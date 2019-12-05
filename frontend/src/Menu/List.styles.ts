import styled from 'styled-components';
import { ListItem as MuiListItem } from '@material-ui/core';

export const ListItem = styled(MuiListItem)`
  &&.active {
    background-color: green;
  }
`;
