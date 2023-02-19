import TodoItem from './TodoItem';
import TodoItemPlus from './TodoItemPlus';
import { useEffect, useState } from 'react';
import { getLocalStorage } from 'utils/localStorage';
import useTodoListStore from 'store/todoStore';
import { todoKey } from 'constants/keyValue';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { getFormattedDate, getNextDate, getPreviousDate } from 'utils/date';
import Calendar from './Calendar';
export default function TodoListContainer() {
  const { todoList, setTodoList } = useTodoListStore();
  const [date, setDate] = useState<Date>(new Date());
  useEffect(() => {
    //로컬 스토리지에서 todo
    const todos = getLocalStorage(todoKey);
    if (!todos) return;
    setTodoList(JSON.parse(todos));
  }, [setTodoList]);

  /*날짜 부분 누르면 달력 나오게 설정 */
  return (
    <div>
      <div className="flex w-full">
        <button
          className="text-lg text-slate-400"
          onClick={() => {
            setDate(getPreviousDate(date));
          }}
        >
          <BsChevronLeft />
        </button>
        <p className="text-xl font-bold mx-3 w-60 text-center cursor-pointer">
          {getFormattedDate(date)}
        </p>
        <Calendar selectedDate={date} />
        <button
          className="text-lg text-slate-400"
          onClick={() => {
            setDate(getNextDate(date));
          }}
        >
          <BsChevronRight />
        </button>
      </div>
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
