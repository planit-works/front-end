import { Todo } from 'types/Todo';
import { BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <div className="flex w-full group items-center">
      <input type="checkbox" name="done" defaultChecked={todo.done} />
      <p>{todo.title}</p>
      <div className="invisible group-hover:visible">
        <button>
          <BsPencilSquare />
        </button>
        <button>
          <BsFillTrashFill />
        </button>
      </div>
    </div>
  );
}
