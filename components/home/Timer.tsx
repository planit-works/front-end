import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import { useTimer } from '../../hooks/useTimer';
import TimerInput from './TimerInput';

export default function Timer() {
  const {
    running,
    handleStart,
    handleStop,
    inputTypes,
    timerInputRefs,
    addMinutes,
  } = useTimer();

  return (
    <div>
      <div className="text-7xl">
        {inputTypes.map((type, index) => (
          <span key={type}>
            <TimerInput
              type={type}
              ref={(el) => (timerInputRefs.current[index] = el)}
            />
            {index < 2 && ':'}
          </span>
        ))}
      </div>
      <div className="flex justify-center text-lg">
        <button onClick={running ? handleStop : handleStart}>
          {running ? (
            <BsFillPauseFill size={30} />
          ) : (
            <BsFillPlayFill size={30} />
          )}
        </button>
      </div>
      <div className={`flex justify-around text-lg ${running && 'hidden'}`}>
        <button
          onClick={() => {
            !running && addMinutes(5);
          }}
        >
          +5m
        </button>
        <button
          onClick={() => {
            !running && addMinutes(15);
          }}
        >
          +15m
        </button>
      </div>
    </div>
  );
}
