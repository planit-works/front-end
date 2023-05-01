import { useCallback, useRef, useState } from 'react';

export default function useCalendarContainer() {
  const [date, setDate] = useState<Date>(new Date());
  const [calendarVisible, setCalendarVisible] = useState<boolean>(false);
  const calendarDivRef = useRef<HTMLDivElement>(null);
  //수정중
  // const handleClickOutside = useCallback((e: MouseEvent) => {
  //   const target = e.target as Node;
  //   if (calendarDivRef.current && !calendarDivRef.current.contains(target)) {
  //     setCalendarVisible(false);
  //   }
  // }, []);
  const handleOpenCalendar = useCallback((e: React.MouseEvent) => {
    setCalendarVisible((visible) => !visible);
  }, []);
  const handleCloseCalendar = useCallback((e: React.MouseEvent) => {
    const target = e.target as Node;
    if (calendarDivRef.current && !calendarDivRef.current.contains(target))
      setCalendarVisible(false);
  }, []);

  return {
    calendarDivRef,
    date,
    setDate,
    calendarVisible,
    setCalendarVisible,
    handleOpenCalendar,
    handleCloseCalendar,
  };
}
