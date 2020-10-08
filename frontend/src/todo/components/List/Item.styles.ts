import styled from 'styled-components';
import MUIEditIcon from '@material-ui/icons/Edit';

export const MenuContainer = styled.div`
  transition: width 0.2s ease-in-out;
  overflow: hidden;
  padding-right: 5px;
  white-space: nowrap;
`;

export const EditIcon = styled(MUIEditIcon)`
  color: black;
`;
