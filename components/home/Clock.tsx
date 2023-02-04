import { useEffect, useState } from 'react';
import { BsStopwatch } from 'react-icons/bs';
import { useTime } from '../../hooks/useTime';
import { TimeDisplay } from 'types/time';
import Stopwatch from './Stopwatch';

export default function Clock() {
  const [currentTime, setCurrentTime] = useState<TimeDisplay>({
    time: '00:00',
    format: 24,
  });
  const [isStopwatchMode, setStapwatchMode] = useState<boolean>(false);
  const { handleClockFormat, getCurrentTime } = useTime(
    currentTime,
    setCurrentTime,
  );
  useEffect(() => {
    getCurrentTime();
    const intervalId = setInterval(() => getCurrentTime(), 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="group flex items-center justify-center">
      <button
        className="invisible group-hover:visible group-hover:animate-appearToLeft w-8 text-white text-lg"
        onClick={() => setStapwatchMode((pre) => !pre)}
      >
        <BsStopwatch />
      </button>
      <div>
        {isStopwatchMode ? (
          <Stopwatch />
        ) : (
          <span className="text-white font-medium text-[11em]">
            {currentTime.time}
          </span>
        )}
      </div>
      <button
        className="w-8 invisible group-hover:visible group-hover:animate-appearToRight text-white text-lg"
        onClick={handleClockFormat}
      >
        {`${currentTime.format}H`}
      </button>
    </div>
  );
}
