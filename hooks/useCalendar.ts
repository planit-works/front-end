import { useMemo, useState, useCallback } from 'react';
import { BasicDate } from 'types/date';
import { getBasicDate } from 'utils/date';

export default function useCalendar(selectedDate: Date) {
  const [basicDate, setBasicDate] = useState<BasicDate>(
    getBasicDate(selectedDate),
  );
  const calendarGridArray = useMemo(() => {
    const { year: currentYear, month: currentMonth } = basicDate;
    /*firstDayOfMonth: 이 달의 첫번째 요일
    daysInMonth: 이 달에 있는 날의 수*/
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const calendarGrid = [];
    let day = 1;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDayOfMonth) || day > daysInMonth) {
          calendarGrid.push(null);
        } else {
          calendarGrid.push(day);
          day++;
        }
      }
    }

    return calendarGrid;
  }, [basicDate]);
  const handleClickPreMonth = useCallback(() => {
    //현재 표시된 월이 1월일때
    if (basicDate.month === 0) {
      setBasicDate({ year: basicDate.year - 1, month: 11, date: 0 });
    } else {
      setBasicDate({
        year: basicDate.year,
        month: basicDate.month - 1,
        date: 0,
      });
    }
  }, [basicDate]);
  const handleClickNextMonth = useCallback(() => {
    //현재 표시된 월이 12월일때
    if (basicDate.month === 11) {
      setBasicDate({ year: basicDate.year + 1, month: 0, date: 0 });
    } else {
      setBasicDate({
        year: basicDate.year,
        month: basicDate.month + 1,
        date: 0,
      });
    }
  }, [basicDate]);

  return {
    basicDate,
    setBasicDate,
    calendarGridArray,
    handleClickPreMonth,
    handleClickNextMonth,
  };
}
