import React, { useState, useRef } from "react";
import {
  FormContainer,
  NewButton,
  Input,
  SaveButton,
  AddIcon
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

  return (
    <FormContainer>
      <AddIcon />
      {isButtonVisible && (
        <NewButton
          onClick={() => {
            setTimeout(() => inputEl.current && inputEl.current!.focus());
            setButtonVisible(false);
          }}
        >
          Neue Aufgabe
        </NewButton>
      )}
      {!isButtonVisible && (
        <>
          <Input
            ref={inputEl}
            type="text"
            value={title}
            placeholder="Neue Aufgabe"
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
