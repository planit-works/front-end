import { useEffect, useState } from 'react';
import { BsStopwatch } from 'react-icons/bs';
import { useTime } from '../../hooks/useTime';
import { TimeDisplay } from 'types/time';
import Stopwatch from './Stopwatch';
import CurrentTimeIndicator from './CurrentTimeIndicator';

export default function Clock() {
  const [currentTime, setCurrentTime] = useState<TimeDisplay>({
    time: '00:00',
    format: 24,
  });
  const [isStopwatchMode, setStopwatchMode] = useState<boolean>(false);
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
  }, [currentTime.format]);

  return (
    <div className="group flex items-center justify-center">
      <button
        className="invisible group-hover:visible group-hover:animate-appearToLeft w-8 text-white text-lg"
        onClick={() => setStopwatchMode((pre) => !pre)}
      >
        <BsStopwatch />
      </button>
      <div className="text-white font-medium flex flex-col items-center w-96">
        {isStopwatchMode ? (
          <Stopwatch />
        ) : (
          <CurrentTimeIndicator currentTime={currentTime} />
        )}
      </div>
      <button
        className={`w-8 invisible group-hover:visible group-hover:animate-appearToRight text-white text-lg ${
          isStopwatchMode && 'group-hover:invisible'
        }`}
        onClick={handleClockFormat}
      >
        {`${currentTime.format}H`}
      </button>
    </div>
  );
}
