import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import produce from "immer";
import { CheckboxChangeEvent } from '../util/checkbox/Checkbox';

export default function useForm<T>(
  initialValue: T,
  onSave?: (item: T) => Promise<void>
): {
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | CheckboxChangeEvent) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
  setItem: Dispatch<SetStateAction<T>>;
  item: T;
} {
  const [item, setItem] = useState<T>(initialValue);
  
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | CheckboxChangeEvent) {
    let value: string | boolean;
    const name = e.target.name as keyof T;
    if (e.type === 'checkboxEvent') {
      value = (e as CheckboxChangeEvent).target.checked;
    } else {
      value = e.target.value;
    }

    setItem((prevState) =>
      produce(prevState, (draftState: T) => {
        draftState[name] = value as never;
      })
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (onSave) {
      await onSave(item);
    }
    setItem(initialValue);
  }

  return {
    handleSubmit,
    handleChange,
    setItem,
    item,
  };
}
