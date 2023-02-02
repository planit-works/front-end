import useTodoListStore from 'store/todoStore';
import { useCallback, useRef } from 'react';
import { Todo } from 'types/Todo';
import { getRandomString } from '../../utils/getRandomString';
import { setLocalStorage } from '../../utils/localStorage';

export default function TodoItemPlus() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { todoList, setTodoList } = useTodoListStore();
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputRef.current) return;
      //새로운 Todo 객체 생성
      const newTodo: Todo = {
        id: getRandomString(),
        title: inputRef.current.value,
        done: false,
      };
      //로컬스토리지 저장
      setLocalStorage('todo-list', JSON.stringify([...todoList, newTodo]));
      setTodoList([...todoList, newTodo]);
      //input 요소 초기화
      inputRef.current.value = '';
    },
    [setTodoList, todoList],
  );

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <input placeholder="New Todo" className="w-full" ref={inputRef}></input>
    </form>
  );
}
