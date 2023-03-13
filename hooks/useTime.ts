import { useEffect, useState } from 'react';
import { TimeDisplay } from 'types/time';
import { getLocalStorage, setLocalStorage } from 'utils/localStorage';
import { getTimeByFormat } from 'utils/time';

export function useTime() {
  const [currentTime, setCurrentTime] = useState<TimeDisplay>({
    time: '00:00',
    format: 24,
  });

  //현재 시간 반환
  const getCurrentTime = () => {
    //로컬스토리지에서 timeformat을 가져와서 형식 변경
    let newFormat: 12 | 24 = 24;
    if (getLocalStorage('time-format') === '12') {
      newFormat = 12;
    }
    const { hours, minutes } = getTimeByFormat(currentTime.format);
    setCurrentTime((pre) => ({
      time: `${hours}:${minutes}`,
      format: newFormat,
    }));
  };

  useEffect(() => {
    getCurrentTime();
    const intervalId = setInterval(() => getCurrentTime(), 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentTime.format]);

  //12 <-> 24 표기 변경
  const handleClockFormat = () => {
    setLocalStorage('time-format', currentTime.format === 12 ? '24' : '12');
    setCurrentTime((pre) => ({ ...pre, format: pre.format === 12 ? 24 : 12 }));
  };

  return { currentTime, getCurrentTime, handleClockFormat };
}
