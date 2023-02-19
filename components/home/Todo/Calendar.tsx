import React, { useRef } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { getMonthName, getBasicDate } from 'utils/date';
import useCalendar from '../../../hooks/useCalendar';
import { BasicDate } from 'types/date';
interface CalenderProps {
  selectedDate: Date;
}

export default function Calendar({ selectedDate }: CalenderProps) {
  const todayDate = useRef<BasicDate>(getBasicDate(new Date()));
  const {
    basicDate,
    calendarGridArray,
    handleClickNextMonth,
    handleClickPreMonth,
  } = useCalendar(selectedDate);

  return (
    <div className="absolute -left-10 top-10 w-[300px] bg-sky-500 rounded">
      <div className="month-container text-white w-full py-2 flex justify-between relative">
        <button className="ml-1" onClick={handleClickPreMonth}>
          <BsChevronLeft />
        </button>
        <span className="text-xl font-semibold">
          {basicDate && getMonthName(basicDate.month).toLocaleUpperCase()}
        </span>
        <button className="mr-1" onClick={handleClickNextMonth}>
          <BsChevronRight />
        </button>
      </div>
      <div className="days-container text-white pb-1">
        <ul className="flex justify-around">
          {['SUN', 'MON', 'TUS', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
            <li key={day}>{day}</li>
          ))}
        </ul>
      </div>
      <div className="dates-container w-full">
        <ul className="w-full grid grid-cols-7 text-white">
          {calendarGridArray.map((dateInCalendar, index) => {
            return (
              <li
                key={index}
                className={`text-center py-1 ${
                  basicDate.year === todayDate.current.year &&
                  basicDate.month === todayDate.current.month &&
                  dateInCalendar === todayDate.current.date &&
                  'font-extrabold text-amber-400'
                }`}
              >
                {dateInCalendar}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
