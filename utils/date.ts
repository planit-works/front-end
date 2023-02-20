import { BasicDate } from 'types/date';
export const getNextDate = (date: Date) => {
  const copyDate = new Date(date);

  copyDate.setDate(date.getDate() + 1);

  return copyDate;
};
export const getPreviousDate = (date: Date) => {
  const copyDate = new Date(date);

  copyDate.setDate(date.getDate() - 1);

  return copyDate;
};

export const getFormattedDate = (date: Date) => {
  const nowDate = new Date();
  //오늘 날짜와 같으면 Today 출력
  if (nowDate.toDateString() === date.toDateString()) {
    return 'Today';
  }
  const year = date.getFullYear();
  const month = getMonthName(date.getMonth());
  const day = date.getDate();
  //현재 년도와 같으면
  if (nowDate.getFullYear() === date.getFullYear()) {
    return `${day} ${month}`;
  }

  return `${day} ${month}, ${year}`;
};

export const getMonthName = (month: number) =>
  [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ][month];

export const getLastDate = (month: number) =>
  ['31', '29', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'][
    month
  ];

export const getBasicDate = (date: Date): BasicDate => ({
  year: date.getFullYear(),
  month: date.getMonth(),
  date: date.getDate(),
});
