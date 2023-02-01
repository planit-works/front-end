import { todoKey } from 'constants/keyValue';
import useTodoListStore from 'store/todoStore';
import { Todo } from 'types/Todo';
import { setLocalStorage } from 'utils/localStorage';

export function useTodo() {
  const { todoList, setTodoList } = useTodoListStore();

  const handleDelete = (id: string) => () => {
    const updatedList = todoList.filter((todo) => todo.id !== id);
    //localStorage에서 todo-list 업데이트
    setLocalStorage(todoKey, updatedList);
    //state에서 현재 todo 삭제
    setTodoList(updatedList);
  };
  const handleUpdate = (id: string, updatedTodo: Todo) => () => {
    const updatedList = todoList.map((todo) =>
      todo.id === id ? updatedTodo : todo,
    );
    //localStorage에서 todo-list 업데이트
    setLocalStorage(todoKey, updatedList);
    //state에서 현재 todo 삭제
    setTodoList(updatedList);
  };

  return { handleDelete, handleUpdate };
}
