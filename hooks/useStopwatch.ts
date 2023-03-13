import { useCallback } from 'react';
import useStopwatchStore from 'store/stopwatchStore';

export function useStopwatch() {
  const { start, stop, reset, intervalId } = useStopwatchStore();
  const handleStart = () => {
    start();
  };
  const handleStop = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    stop();
  }, [intervalId, stop]);

  const handleReset = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    reset();
  };
  //ms를 "HH:MM:SS"형식으로 변경
  const formatStopwatch = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor((totalSeconds / 60) % 60);
    const seconds = totalSeconds % 60;
    const hours = Math.floor(totalSeconds / 3600);
    const milliseconds = Math.floor((ms % 1000) / 10);
    const formatMilliSeconds = milliseconds.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedHours = hours.toString().padStart(2, '0');
    if (hours === 0)
      return `${formattedMinutes}:${formattedSeconds}:${formatMilliSeconds}`;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  return { handleReset, handleStart, handleStop, formatStopwatch };
}
