import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import MuiSearchIcon from '@material-ui/icons/Search';

export const SearchField = styled(TextField)`
  && {
    margin: 2px 0;
  }

  && .MuiInputBase-input {
    color: white;
  }
`;

export const SearchIcon = styled(MuiSearchIcon)`
  color: white;
`;
