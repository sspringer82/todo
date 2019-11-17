import styled from 'styled-components';

export const ListItem = styled.li`
  border: 1px solid black;
  border-radius: 5px;
  margin: 5px;
  height: 30px;
  display: flex;
  align-items: center;
  padding-left: 5px;
`;

export const Title = styled.div`
  padding-left: 5px;
  flex-grow: 1;
`;

export const MenuContainer = styled.div`
  transition: width 0.2s ease-in-out;
  overflow: hidden;
  padding-right: 5px;
  white-space: nowrap;
`;
