import React, { useState, useRef } from "react";
import {
  FormContainer,
  NewButton,
  Input,
  SaveButton,
  AddIcon,
  NotDoneIcon
} from "./Form.styles";

interface Props {
  onSave: (title: string) => void;
}

const Form: React.FC<Props> = ({ onSave }) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [isButtonVisible, setButtonVisible] = useState(true);

  function handleSave() {
    onSave(title);
    setTitle("");
    setButtonVisible(true);
  }

  function handleCreate() {
    setTimeout(() => inputEl.current && inputEl.current!.focus());
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
            onKeyDown={e => e.key === "Enter" && handleSave()}
            onChange={e => setTitle(e.currentTarget.value)}
            onBlur={e => {
              if (title === "") {
                setButtonVisible(true);
              } else {
                handleSave();
              }
            }}
          />

          {title !== "" && (
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
