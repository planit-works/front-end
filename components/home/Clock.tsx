import { useState, useCallback } from 'react';
import { BsStopwatch } from 'react-icons/bs';
import Stopwatch from './Stopwatch';
import CurrentTimeIndicator from './CurrentTimeIndicator';
import Timer from './Timer';

/**Clock 컴포넌트에서 어떤 컴포넌트를 표시할 지 정하는 모드 */
type ClockMode = 'clock' | 'stopwatch' | 'timer';
export default function Clock() {
  const [mode, setMode] = useState<ClockMode>('clock');

  const changeMode = useCallback(() => {
    switch (mode) {
      case 'clock':
        setMode('stopwatch');
        break;
      case 'stopwatch':
        setMode('timer');
        break;
      case 'timer':
        setMode('clock');
    }
  }, [mode]);

  return (
    <div className="group flex items-center justify-center">
      <button
        className="invisible group-hover:visible group-hover:animate-appearToLeft w-8 text-white text-lg
        md:text-base md:w-6"
        onClick={() => changeMode()}
      >
        <BsStopwatch />
      </button>
      <div
        className="text-white font-medium flex flex-col items-center w-[27rem]
        md:w-[20rem]
      "
      >
        {mode === 'stopwatch' && <Stopwatch />}
        {mode === 'clock' && <CurrentTimeIndicator />}
        {mode === 'timer' && <Timer />}
      </div>
    </div>
  );
}
