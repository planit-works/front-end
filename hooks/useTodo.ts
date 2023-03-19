import { todoKey } from 'constants/keyValue';
import { RefObject } from 'react';
import useTodoListStore from 'store/todoStore';
import { Todo } from 'types/Todo';
import { getRandomString } from 'utils/getRandomString';
import { setLocalStorage } from 'utils/localStorage';

export function useTodo() {
  const { todoList, setTodoList } = useTodoListStore();
  const handleCreate =
    (inputRef: RefObject<HTMLInputElement>) => (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputRef.current || inputRef.current.value.length < 1)
        return; //최소 1글자 이상 입력
      else if (todoList.length >= 25) return;
      else {
        const newTodo: Todo = {
          id: getRandomString(),
          date: '',
          title: inputRef.current.value,
          done: false,
        };
        //로컬스토리지 저장
        setLocalStorage('todo-list', JSON.stringify([...todoList, newTodo]));
        setTodoList([...todoList, newTodo]);
        //input 요소 초기화
        inputRef.current.value = '';
      }
      //새로운 Todo 객체 생성
    };

  const handleDelete = (id: string) => () => {
    const updatedList = todoList.filter((todo) => todo.id !== id);
    //localStorage에서 todo-list 업데이트
    setLocalStorage(todoKey, updatedList);
    //state에서 현재 todo 삭제
    setTodoList(updatedList);
  };
  const handleUpdate = (id: string, updatedTodo: Todo) => () => {
    if (updatedTodo.title.length < 1) return; //최소 1글자 이상 입력
    const updatedList = todoList.map((todo) =>
      todo.id === id ? updatedTodo : todo,
    );
    //localStorage에서 todo-list 업데이트
    setLocalStorage(todoKey, updatedList);
    //state에서 현재 todo 삭제
    setTodoList(updatedList);
  };

  return { handleCreate, handleDelete, handleUpdate };
}
