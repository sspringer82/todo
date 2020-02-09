import styled from 'styled-components';
import {
  Select as MUISelect,
  TextField as MUITextField,
  Divider as MUIDivider,
} from '@material-ui/core';
import { DateTimePicker as MUIDateTimePicker } from '@material-ui/pickers';

export const Select = styled(MUISelect)`
  width: 100%;
`;

export const TextField = styled(MUITextField)`
  width: 100%;
`;

export const DateTimePicker = styled(MUIDateTimePicker)`
  width: 100%;
`;

export const Divider = styled(MUIDivider)`
  && {
    margin: 10px 0;
  }
`;
