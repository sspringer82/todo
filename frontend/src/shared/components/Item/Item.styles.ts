import styled, { css } from 'styled-components';
import MuiCheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

interface ItemProps {
  isActive: boolean;
}

export const ListItem = styled.li`
  padding: 5px 0;
  ${({ isActive }: ItemProps) =>
    isActive &&
    css`
      background-color: lightgrey;
    `}
  display: flex;
  align-items: center;
`;

interface TitleProps {
  done: boolean;
}

export const Title = styled.div`
  padding-left: 5px;
  flex-grow: 1;
  ${({ done }: TitleProps) =>
    done &&
    css`
      color: grey;
      text-decoration: line-through;
    `}
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const CheckCircleOutlineIcon = styled(MuiCheckCircleOutlineIcon)`
  color: grey;
`;
