import styled from 'styled-components';

export const FormContainer = styled.div`
  padding: 5px 0;
  margin: 5px 0;
  height: 30px;
  display: flex;
  align-items: center;
  position: relative;
`;

export const NewButton = styled.button`
  background-color: black;
  font-size: inherit;
  font-family: inherit;
  text-align: left;
  color: inherit;
  border-radius: 5px;
  width: 100%;
  padding: 5px;
  height: 100%;
  border: none;
`;

export const Input = styled.input`
  background-color: black;
  color: white;
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
