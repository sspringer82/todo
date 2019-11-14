import React, { useState } from 'react';

interface Props {
  onSave: (title: string) => void;
}

const Form: React.FC<Props> = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [isButtonVisible, setButtonVisible] = useState(true);

  function handleSave() {
    onSave(title);
    setTitle('');
    setButtonVisible(true);
  }

  return (
    <div>
      {isButtonVisible && (
        <button onClick={() => setButtonVisible(false)}>Neue Aufgabe</button>
      )}
      {!isButtonVisible && (
        <div>
          <input
            type="text"
            value={title}
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
            <button
              onClick={() => {
                handleSave();
              }}
            >
              speichern
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Form;
