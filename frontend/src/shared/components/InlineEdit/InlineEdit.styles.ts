import styled from 'styled-components';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

export const FormContainer = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  margin: 5px;
  height: 30px;
  display: flex;
  align-items: center;
  position: relative;
`;

export const NewButton = styled.button`
  font-size: inherit;
  font-family: inherit;
  text-align: left;
  padding-left: 5px;
  color: inherit;
  border-radius: 5px;
  width: 100%;
  padding: 5px;
  height: 100%;
  border: none;
`;

export const Input = styled.input`
  font-size: inherit;
  font-family: inherit;
  border-radius: 5px;
  padding-left: 5px;
  height: 28px;
  border: none;
  &:focus {
    outline: none;
  }
  flex-grow: 1;
`;

export const SaveButton = styled.button`
  position: absolute;
  right: 5px;
`;

export const AddIcon = styled(AddCircleOutlineIcon)`
  margin-left: 5px;
`;

export const NotDoneIcon = styled(RadioButtonUncheckedIcon)`
  margin-left: 5px;
`;
