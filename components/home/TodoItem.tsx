import { Todo } from 'types/Todo';
import { BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';
import { useCallback } from 'react';
import useTodoListStore from 'store/todoStore';
import { setLocalStorage } from 'utils/localStorage';
import { todoKey } from 'constants/keyValue';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { todoList, setTodoList } = useTodoListStore();
  const handleDelete = useCallback(() => {
    const updatedList = todoList.filter((item) => item !== todo);
    //localStorage에서 todo-list 업데이트
    setLocalStorage(todoKey, updatedList);
    //state에서 현재 todo 삭제
    setTodoList(updatedList);
  }, [setTodoList, todo, todoList]);

  return (
    <div className="flex w-full group items-center">
      <input type="checkbox" name="done" defaultChecked={todo.done} />
      <p className="ml-1">{todo.title}</p>
      <div className="invisible group-hover:visible">
        <button>
          <BsPencilSquare />
        </button>
        <button onClick={handleDelete}>
          <BsFillTrashFill />
        </button>
      </div>
    </div>
  );
}
