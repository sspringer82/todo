import styled from 'styled-components';
import { ListItem as MuiListItem, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const ListItem = styled(MuiListItem)`
  && {
    display: flex;
    justify-content: space-between;
    border: 1px solid white;
    border-radius: 5px;
  }

  && .MuiButton-label {
    justify-content: flex-start;
  }
  &&.active {
    border: 1px solid black;
  }
`;

export const EditLink = styled(Link)`
  color: black;
`;

export const ItemButton = styled(Button)`
  flex-grow: 1;
  justify-content: flex-start;
`;
