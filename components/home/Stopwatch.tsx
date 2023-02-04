import useStopwatchStore from 'store/stopWatchStore';
import { useStopwatch } from '../../hooks/useStopwatch';

export default function Stopwatch() {
  const { running, elapsedTime } = useStopwatchStore();
  const { handleStop, handleStart, handleReset } = useStopwatch();

  return (
    <div>
      <p>{elapsedTime}ms</p>
      <button onClick={running ? handleStop : handleStart}>
        {running ? 'Stop' : 'Start'}
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
