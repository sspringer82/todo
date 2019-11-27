import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import MuiSearchIcon from '@material-ui/icons/Search';
import MuiClearIcon from '@material-ui/icons/Clear';

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

export const ClearIcon = styled(MuiClearIcon)`
  color: white;
`;
