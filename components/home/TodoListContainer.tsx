import TodoItem from './TodoItem';
import TodoItemPlus from './TodoItemPlus';
import { useEffect } from 'react';
import { getLocalStorage } from '../../utils/localStorage';
import useTodoListStore from 'store/todoStore';
import { todoKey } from '../../constants/keyValue';
export default function TodoListContainer() {
  const { todoList, setTodoList } = useTodoListStore();
  useEffect(() => {
    //로컬 스토리지에서 todo
    const todos = getLocalStorage(todoKey);
    if (!todos) return;
    setTodoList(JSON.parse(todos));
  }, [setTodoList]);

  return (
    <div>
      <p className="text-4xl font-bold">Todo</p>
      <ul className="mx-3 my-2">
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
