import { Todo } from 'types/Todo';
import { BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';
import { useTodo } from '../../hooks/useTodo';
import React, { useState, useCallback } from 'react';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { handleDelete, handleUpdate } = useTodo();
  const [isUpdating, setIsUpdating] = useState<Boolean>(false);
  const handleUpdateBtnClick = useCallback(() => {
    setIsUpdating(true);
  }, []);
  const handleTitleUpdate = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      handleUpdate(todo.id, { ...todo, title: event.currentTarget.value })();
      setIsUpdating(false);
    },
    [handleUpdate, todo],
  );

  return (
    <div className="flex w-full group items-center">
      <input
        type="checkbox"
        name="done"
        defaultChecked={todo.done}
        onChange={handleUpdate(todo.id, { ...todo, done: !todo.done })}
      />
      <p className="ml-1">
        {isUpdating ? (
          <input
            defaultValue={todo.title}
            onBlur={handleTitleUpdate}
            onKeyDown={(e) => {
              e.key === 'Enter' && handleTitleUpdate(e);
            }}
            autoFocus
          />
        ) : (
          todo.title
        )}
      </p>
      {!isUpdating && (
        <div className="invisible group-hover:visible">
          <button onClick={handleUpdateBtnClick}>
            <BsPencilSquare />
          </button>
          <button onClick={handleDelete(todo.id)}>
            <BsFillTrashFill />
          </button>
        </div>
      )}
    </div>
  );
}
