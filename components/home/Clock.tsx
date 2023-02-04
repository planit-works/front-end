import { useCallback, useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../../utils/localStorage';
import { getTimeByFormat } from '../../utils/time';
import { BsStopwatch } from 'react-icons/bs';

type TimeDisplay = {
  time: string;
  format: 12 | 24;
};
export default function Clock() {
  const [timer, setTimer] = useState<TimeDisplay>({
    time: '00:00',
    format: 24,
  });
  const currentTimer = useCallback(() => {
    //로컬스토리지에서 timeformat을 가져와서 형식 변경
    let newFormat: 12 | 24 = 24;
    if (getLocalStorage('time-format') === '12') {
      newFormat = 12;
    }
    const { hours, minutes } = getTimeByFormat(timer.format);
    setTimer((pre) => ({ time: `${hours}:${minutes}`, format: newFormat }));
  }, [timer.format]);

  useEffect(() => {
    currentTimer();
    const intervalId = setInterval(() => currentTimer(), 1000);
    //1초마다 currentTimer 반복

    return () => {
      clearInterval(intervalId);
    };
  }, [currentTimer]);

  return (
    <div className="group flex items-center justify-center">
      <button className="invisible group-hover:visible group-hover:animate-appearToLeft w-8 text-white text-lg">
        <BsStopwatch />
      </button>
      <span className="text-white font-medium text-9xl">{timer.time}</span>
      <button
        className="w-8 invisible group-hover:visible group-hover:animate-appearToRight text-white text-lg"
        onClick={() => {
          setLocalStorage('time-format', timer.format === 12 ? '24' : '12');
          setTimer((pre) => ({ ...pre, format: pre.format === 12 ? 24 : 12 }));
        }}
      >
        {`${timer.format}H`}
      </button>
    </div>
  );
}
