import React from 'react';
import { Link } from 'react-router-dom';
import Done from '../done/Done';
import { Todo, TodoInput } from '../Todo';
import InlineForm from '../inlineForm/InlineForm';
import { ButtonContainer, TitleBorderBottom, TitleBorderTop } from './Border';
import DeleteIcon from '@material-ui/icons/Delete';
import BuildIcon from '@material-ui/icons/Build';
import SearchIcon from '@material-ui/icons/Search';

export type Props = {
  editModeEnabled: boolean;
  todo: Todo;
  canEdit: boolean;
  onEditModeEnable: (id: number | null) => void;
  onDelete: (id: number) => void;
  onSave(todo: TodoInput): Promise<void>;
};

const ListItem: React.FC<Props> = ({
  todo,
  canEdit,
  onDelete,
  onSave,
  editModeEnabled: edit,
  onEditModeEnable: onEnableEdit,
}) => {
  if (edit) {
    return (
      <InlineForm
        todo={todo}
        onSave={onSave}
        onCancel={() => onEnableEdit(null)}
      />
    );
  } else {
    return (
      <div data-testid="listItem-container" className="flex">
        <div
          onClick={() => onEnableEdit(todo.id)}
          data-testid="title"
          style={{ position: 'relative' }}
        >
          <TitleBorderTop />
          <div style={{ marginLeft: 10, position: 'relative' }}>
            {todo.title}
          </div>
          <TitleBorderBottom />
        </div>

        <ButtonContainer>
          <Done todo={todo} onSave={onSave} />
        </ButtonContainer>

        <ButtonContainer>
          <button onClick={() => onDelete(todo.id)} data-testid="delete-button">
            <DeleteIcon />
          </button>
        </ButtonContainer>
        {canEdit && (
          <ButtonContainer>
            <Link to={`/edit/${todo.id}`} data-testid="edit-link">
              <BuildIcon />
            </Link>
          </ButtonContainer>
        )}
        <ButtonContainer>
          <Link to={`/detail/${todo.id}`} data-testid="detail-link">
            <SearchIcon />
          </Link>
        </ButtonContainer>
      </div>
    );
  }
};

export default ListItem;
