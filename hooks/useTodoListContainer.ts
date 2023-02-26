import { todoKey } from 'constants/keyValue';
import { useEffect } from 'react';

import useTodoListStore from 'store/todoStore';
import { getLocalStorage } from 'utils/localStorage';

export default function useTodoListContainer() {
  const { todoList, setTodoList } = useTodoListStore();


  useEffect(() => {
    //로컬 스토리지에서 todo
    const todos = getLocalStorage(todoKey);
    if (todos) {
      setTodoList(JSON.parse(todos));
    }
  }, [setTodoList]);

  return {
    todoList,
    setTodoList,

  };
}
