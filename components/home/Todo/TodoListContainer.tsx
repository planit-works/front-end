import TodoItem from './TodoItem';
import TodoItemPlus from './TodoItemPlus';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { getFormattedDate, getNextDate, getPreviousDate } from 'utils/date';
import Calendar from './Calendar';
import useTodoListContainer from '../../../hooks/useTodoListContainer';
export default function TodoListContainer() {
  const {
    calendarDivRef,
    todoList,
    date,
    calendarVisible,
    setCalendarVisible,
    setDate,
    handleOpenCalendar,
  } = useTodoListContainer();

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
        <p
          className="text-xl font-bold mx-3 w-60 text-center cursor-pointer"
          onClick={handleOpenCalendar}
        >
          {getFormattedDate(date)}
        </p>
        {calendarVisible && (
          <Calendar
            selectedDate={date}
            setSelectedDate={setDate}
            calendarRef={calendarDivRef}
            setVisible={setCalendarVisible}
          />
        )}
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
