import {
  TextField as MUITextField,
  FormControl as MUIFormControl,
} from '@material-ui/core';
import styled from 'styled-components';

export const TextField = styled(MUITextField)`
  && {
    width: 100%;
  }
`;

export const FormControl = styled(MUIFormControl)`
  width: 100%;
`;
