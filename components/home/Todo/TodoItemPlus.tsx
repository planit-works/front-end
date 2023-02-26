import { useRef } from 'react';
import { useTodo } from 'hooks/useTodo';

export default function TodoItemPlus() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { handleCreate } = useTodo();

  return (
    <form className="w-full" onSubmit={handleCreate(inputRef)}>
      <input placeholder="New Todo" className="w-full" ref={inputRef}></input>
    </form>
  );
}
