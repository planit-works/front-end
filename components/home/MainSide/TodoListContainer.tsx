import TodoItem from './TodoItem';
import TodoItemPlus from './TodoItemPlus';
import useTodoListContainer from '../../../hooks/useTodoListContainer';
export default function TodoListContainer() {
  const { todoList } = useTodoListContainer();

  return (
    <div className="mt-auto w-full">
      <p className="font-bold text-center text-xl">To do</p>
      <ul className="mx-3 my-2 max-h-[30rem] overflow-auto">
        {todoList &&
          todoList.map((todo) => {
            return (
              <li key={todo.id}>
                <TodoItem todo={todo} />
              </li>
            );
          })}
      </ul>
      <div className="mx-3">
        <TodoItemPlus />
      </div>
    </div>
  );
}
