import styled from 'styled-components';
import { TextField as MuiTextField } from '@material-ui/core';

export const TextField = styled(MuiTextField)`
  && {
    margin: 8px 0;
  }

  && .MuiInput-input {
    padding-left: 8px;
  }
`;

export const LoginContainer = styled.form`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
