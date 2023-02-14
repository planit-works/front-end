import useStopwatchStore from 'store/stopwatchStore';
import { useStopwatch } from '../../hooks/useStopwatch';

export default function Stopwatch() {
  const { running, elapsedTime } = useStopwatchStore();
  const { handleStop, handleStart, handleReset, formatStopwatch } =
    useStopwatch();

  return (
    <div>
      <p className="text-7xl">{formatStopwatch(elapsedTime)}</p>
      <div className="flex justify-between">
        <button onClick={running ? handleStop : handleStart}>
          {running ? 'Stop' : 'Start'}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
