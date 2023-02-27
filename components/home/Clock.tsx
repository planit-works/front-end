import { useState } from 'react';
import { BsStopwatch } from 'react-icons/bs';
import { useTime } from '../../hooks/useTime';
import Stopwatch from './Stopwatch';
import CurrentTimeIndicator from './CurrentTimeIndicator';
import Timer from './Timer';

export default function Clock() {
  const [isStopwatchMode, setStopwatchMode] = useState<boolean>(false);
  const { handleClockFormat, currentTime } = useTime();

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
        <Timer />
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
