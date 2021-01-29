import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import NotDoneIcon from '@material-ui/icons/RadioButtonUnchecked';
import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
} from 'react';
import {
  FormContainer,
  NewButton,
  Input,
  SaveButton,
} from './InlineEdit.styles';

interface Task {
  title: string;
}

interface Props {
  task?: Task;
  onSave: (task: Task) => void;
}

const InlineEdit: React.FC<Props> = ({ onSave, task }) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [isButtonVisible, setButtonVisible] = useState(true);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setButtonVisible(false);
    }
  }, [task]);

  function reset() {
    setTitle('');
    setButtonVisible(true);
  }

  function handleSave() {
    onSave({ title });
    reset();
  }

  useEffect(() => {
    inputEl.current && inputEl.current!.focus();
  }, [isButtonVisible]);

  function handleCreate() {
    setButtonVisible(false);
  }

  return (
    <FormContainer>
      {isButtonVisible && (
        <>
          <IconButton onClick={handleCreate}>
            <AddIcon style={{ color: 'white' }} />
          </IconButton>
          <NewButton onClick={handleCreate}>Neue Aufgabe</NewButton>
        </>
      )}
      {!isButtonVisible && (
        <>
          <IconButton>
            <NotDoneIcon style={{ color: 'white' }} />
          </IconButton>
          <Input
            ref={inputEl}
            type="text"
            value={title}
            placeholder="Neue Aufgabe"
            onKeyDown={(e: KeyboardEvent) => e.key === 'Enter' && handleSave()}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.currentTarget.value)
            }
            onBlur={() => {
              if (title === '') {
                setButtonVisible(true);
              } else {
                handleSave();
              }
            }}
          />

          {title !== '' && (
            <SaveButton
              onClick={() => {
                handleSave();
              }}
            >
              speichern
            </SaveButton>
          )}
        </>
      )}
    </FormContainer>
  );
};

export default InlineEdit;
