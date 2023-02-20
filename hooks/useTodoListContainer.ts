import { todoKey } from 'constants/keyValue';
import { useEffect, useState, useCallback, useRef } from 'react';
import useTodoListStore from 'store/todoStore';
import { getLocalStorage } from 'utils/localStorage';

export default function useTodoListContainer() {
  const { todoList, setTodoList } = useTodoListStore();
  const [date, setDate] = useState<Date>(new Date());
  const [calendarVisible, setCalendarVisible] = useState<boolean>(false);
  const calendarDivRef = useRef<HTMLDivElement>(null);
  //수정중
  const handleClickOutside = useCallback((e: MouseEvent) => {
    const target = e.target as Node;
    if (calendarDivRef.current && !calendarDivRef.current.contains(target)) {
      setCalendarVisible(false);
    }
  }, []);
  const handleOpenCalendar = useCallback((e: React.MouseEvent) => {
    setCalendarVisible(true);
  }, []);
  const handleCloseCalendar = useCallback((e: React.MouseEvent) => {
    const target = e.target as Node;
    if (calendarDivRef.current && !calendarDivRef.current.contains(target))
      setCalendarVisible(false);
  }, []);

  useEffect(() => {
    //로컬 스토리지에서 todo
    const todos = getLocalStorage(todoKey);
    if (todos) {
      setTodoList(JSON.parse(todos));
    }
  }, [handleClickOutside, setTodoList]);

  return {
    calendarDivRef,
    todoList,
    setTodoList,
    date,
    setDate,
    calendarVisible,
    setCalendarVisible,
    handleOpenCalendar,
    handleCloseCalendar,
  };
}
