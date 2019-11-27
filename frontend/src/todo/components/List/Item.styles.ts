import styled, { css } from 'styled-components';
import MuiCheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

export const ListItem = styled.li`
  border: 1px solid black;
  border-radius: 5px;
  margin: 5px;
  height: 30px;
  display: flex;
  align-items: center;
  padding-left: 5px;
`;

interface TitleProps {
  done: boolean;
}

export const Title = styled.div`
  padding-left: 5px;
  flex-grow: 1;
  ${(props: TitleProps) =>
    props.done &&
    css`
      color: grey;
      text-decoration: line-through;
    `}
`;

export const MenuContainer = styled.div`
  transition: width 0.2s ease-in-out;
  overflow: hidden;
  padding-right: 5px;
  white-space: nowrap;
`;

export const CheckCircleOutlineIcon = styled(MuiCheckCircleOutlineIcon)`
  color: grey;
`;
