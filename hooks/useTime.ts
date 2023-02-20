import { Dispatch, SetStateAction } from 'react';
import { TimeDisplay } from 'types/time';
import { getLocalStorage, setLocalStorage } from 'utils/localStorage';
import { getTimeByFormat } from 'utils/time';

export function useTime(
  time: TimeDisplay,
  setTime: Dispatch<SetStateAction<TimeDisplay>>,
) {
  //현재 시간 반환
  const getCurrentTime = () => {
    //로컬스토리지에서 timeformat을 가져와서 형식 변경
    let newFormat: 12 | 24 = 24;
    if (getLocalStorage('time-format') === '12') {
      newFormat = 12;
    }
    const { hours, minutes } = getTimeByFormat(time.format);
    setTime((pre) => ({ time: `${hours}:${minutes}`, format: newFormat }));
  };
  //12 <-> 24 표기 변경
  const handleClockFormat = () => {
    setLocalStorage('time-format', time.format === 12 ? '24' : '12');
    setTime((pre) => ({ ...pre, format: pre.format === 12 ? 24 : 12 }));
  };

  return { getCurrentTime, handleClockFormat };
}
