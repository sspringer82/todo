import React, { useState, useRef, useEffect } from 'react';
import {
  FormContainer,
  NewButton,
  Input,
  SaveButton,
  AddIcon,
  NotDoneIcon,
} from './Form.styles';
import { InputTypeTodo } from '../../../shared/Todo';
import { getActiveList } from '../../../list/selectors/list.selector';
import { useSelector } from 'react-redux';

interface Props {
  onSave: (todo: InputTypeTodo) => void;
}

const Form: React.FC<Props> = ({ onSave }) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [isButtonVisible, setButtonVisible] = useState(true);
  const activeList = useSelector(getActiveList);

  function reset() {
    setTitle('');
    setButtonVisible(true);
  }

  function handleSave() {
    const todoToBeSaved: InputTypeTodo = {
      title,
      done: false,
      starred: false,
      sharedWith: [],
    };

    if (activeList) {
      todoToBeSaved['list'] = activeList;
    }

    onSave(todoToBeSaved);
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
          <AddIcon onClick={handleCreate} />
          <NewButton onClick={handleCreate}>Neue Aufgabe</NewButton>
        </>
      )}
      {!isButtonVisible && (
        <>
          <NotDoneIcon />
          <Input
            ref={inputEl}
            type="text"
            value={title}
            placeholder="Neue Aufgabe"
            onKeyDown={e => e.key === 'Enter' && handleSave()}
            onChange={e => setTitle(e.currentTarget.value)}
            onBlur={e => {
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

export default Form;
