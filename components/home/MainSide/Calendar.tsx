import React, { RefObject, useRef } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { getMonthName, getBasicDate } from 'utils/date';
import useCalendar from '../../../hooks/useCalendar';
import { BasicDate } from 'types/date';
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

  /*.balloon:after {
 border-top:0px solid transparent;
 border-left: 10px solid transparent;
 border-right: 10px solid transparent;
 border-bottom: 10px solid pink;
 content:"";
 position:absolute;
 top:-10px;
 left:200px;
} */
  return (
    <div
      className="mt-2 w-full bg-col-calendar rounded
      before:border-transparent before:border-l-[10px] before:border-l-transparent
      before:border-r-[10px] before:border-r-transparent
      before:border-b-[10px] before:border-b-col-calendar
      before:absolute before:-top-2 before:translate-x-[125px] animate-calendarAppear"
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
            <li key={day} className="list-none">
              {day}
            </li>
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
                className={`text-center py-1 w-full relative list-none ${
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
