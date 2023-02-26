import React, { RefObject, useRef } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { getMonthName, getBasicDate } from 'utils/date';
import useCalendar from '../../../hooks/useCalendar';
import { BasicDate } from 'types/date';
import useTodoListContainer from '../../../hooks/useTodoListContainer';
interface CalenderProps {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  calendarRef: RefObject<HTMLDivElement>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Calendar({
  selectedDate,
  setSelectedDate,
  calendarRef,
  setVisible,
}: CalenderProps) {
  const todayDate = useRef<BasicDate>(getBasicDate(new Date()));
  const {
    basicDate,
    calendarGridArray,
    handleClickNextMonth,
    handleClickPreMonth,
  } = useCalendar(selectedDate);

  return (
    <div
      className="absolute left-0 w-[300px] bg-col-calendar rounded"
      ref={calendarRef}
    >
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
        <ul className="grid grid-cols-7 text-center">
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
                onClick={() => {
                  if (!dateInCalendar) return;
                  const tempDate = new Date(basicDate.year, basicDate.month, 1);
                  tempDate.setDate(dateInCalendar);
                  setSelectedDate(tempDate);
                  setVisible(false);
                }}
                className={`text-center py-1 w-full relative ${
                  dateInCalendar && 'cursor-pointer hover:font-bold'
                } ${
                  // 오늘 날짜 표시
                  basicDate.year === todayDate.current.year &&
                  basicDate.month === todayDate.current.month &&
                  dateInCalendar === todayDate.current.date &&
                  'font-extrabold text-amber-400'
                } `}
              >
                <span
                  className={`${
                    basicDate.year === selectedDate.getFullYear() &&
                    basicDate.month === selectedDate.getMonth() &&
                    dateInCalendar === selectedDate.getDate() &&
                    'font-extrabold text-orange-400'
                  }`}
                >
                  {dateInCalendar}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
