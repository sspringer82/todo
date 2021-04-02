import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import produce from "immer";

export default function useForm<T>(
  initialValue: T,
  onSave: (item: T) => Promise<void>
): {
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
  setItem: Dispatch<SetStateAction<T>>;
  item: T;
} {
  const [item, setItem] = useState<T>(initialValue);
  
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    let value: string | boolean = e.target.value;
    const name = e.target.name as keyof T;

    if (e.target.type === 'checkbox') {
      value = (e.target as HTMLInputElement).checked;
    }

    setItem((prevState) =>
      produce(prevState, (draftState: T) => {
        draftState[name] = value as never;
      })
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await onSave(item);
    setItem(initialValue);
  }

  return {
    handleSubmit,
    handleChange,
    setItem,
    item,
  };
}
