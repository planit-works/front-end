import { addLeadingZero } from 'utils/time';
import useTimerStore from '../store/timerStore';
import { useEffect } from 'react';

export function useTimer() {
  const { running, timeLeft, start, end, intervalId, clearIntervalId } =
    useTimerStore();

  const handleStart = () => {
    start();
  };
  const handleEnd = () => {
    intervalId && clearInterval(intervalId);
    end();
  };
  useEffect(() => {
    console.log(intervalId);
    if (timeLeft <= 0) clearInterval(intervalId);
  }, [clearIntervalId, intervalId, timeLeft]);

  const formatTime = (time: number): string => {
    const formatHours = addLeadingZero(Math.floor(time / 3600));
    const formatMinutes = addLeadingZero(Math.floor(time / 60));
    const formatSeconds = addLeadingZero(time % 60);

    return `${formatHours}:${formatMinutes}:${formatSeconds}`;
  };

  return { running, formatTime, timeLeft, handleStart, handleEnd };
}
