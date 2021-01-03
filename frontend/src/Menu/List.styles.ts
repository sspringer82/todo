import styled from 'styled-components';
import { ListItem as MuiListItem, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const ListItem = styled(MuiListItem)`
  && {
    display: flex;
    justify-content: space-between;
  }

  &&.active {
    .MuiButton-label {
    justify-content: flex-start;
    color: blue;
  }
  }

  && .MuiButton-label {
    justify-content: flex-start;
  }
`;

export const EditLink = styled(Link)`
`;

export const ItemButton = styled(Button)`
  flex-grow: 1;
  justify-content: flex-start;
`;
