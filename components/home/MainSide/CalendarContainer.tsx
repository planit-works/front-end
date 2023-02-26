import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { getFormattedDate, getNextDate, getPreviousDate } from 'utils/date';
import useCalendarContainer from '../../../hooks/useCalendarContainer';
import Calendar from './Calendar';

export default function CalendarContainer() {
  const {
    calendarDivRef,
    date,
    calendarVisible,
    setCalendarVisible,
    setDate,
    handleOpenCalendar,
  } = useCalendarContainer();

  return (
    <div className="relative">
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
        <button
          className="text-lg text-slate-400"
          onClick={() => {
            setDate(getNextDate(date));
          }}
        >
          <BsChevronRight />
        </button>
      </div>
      {calendarVisible && (
        <Calendar
          selectedDate={date}
          setSelectedDate={setDate}
          calendarRef={calendarDivRef}
          setVisible={setCalendarVisible}
        />
      )}
    </div>
  );
}
