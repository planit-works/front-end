import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import { useTimer } from '../../hooks/useTimer';
import TimerInput from './TimerInput';

export default function Timer() {
  const { running, handleStart, handleStop, inputTypes, timerInputRefs } =
    useTimer();

  return (
    <div className="absolute top-10 left-10">
      <div className="text-7xl">
        {inputTypes.map((type, index) => (
          <TimerInput
            key={type}
            type={type}
            ref={(el) => (timerInputRefs.current[index] = el)}
          />
        ))}
      </div>
      <div className="flex justify-center text-lg">
        <button onClick={running ? handleStop : handleStart}>
          {running ? <BsFillPauseFill /> : <BsFillPlayFill />}
        </button>
      </div>
      <div className="flex justify-center text-lg">
        <button>15분 추가</button>
      </div>
    </div>
  );
}
