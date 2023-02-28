import { addLeadingZero } from 'utils/time';
import useTimerStore from '../store/timerStore';
import { useCallback, useEffect, useMemo, useRef } from 'react';

export function useTimer() {
  const { running, timeLeft, setTimeLeft, start, end, stop } = useTimerStore();
  /**타이머 input ref */
  const timerInputRefs = useRef<null[] | HTMLInputElement[]>([]);
  /**input 요소에서 시간(초) 가져오기 */
  const getTimeFromInput = useCallback(() => {
    let totalTimeLeft = 0;
    timerInputRefs.current.forEach((inputEl) => {
      if (inputEl) {
        totalTimeLeft = totalTimeLeft * 60 + parseInt(inputEl.value);
      }
    }, []);

    return totalTimeLeft;
  }, []);
  /**시작 시 이벤트 핸들러*/
  const handleStart = () => {
    setTimeLeft(getTimeFromInput());
    if (timeLeft === 0) return;
    start();
  };
  /**중단 시 이벤트 핸들러*/
  const handleStop = () => {
    stop();
  };

  useEffect(() => {
    //0이 되었을 때, 타이머 종료
    if (timeLeft <= 0) end();
  }, [end, timeLeft]);
  /**타이머 남은 시간을, hour, minute, second로 분류 */
  const formatTime = useMemo(() => {
    const formatHours = addLeadingZero(Math.floor(timeLeft / 3600));
    const formatMinutes = addLeadingZero(Math.floor((timeLeft % 3600) / 60));
    const formatSeconds = addLeadingZero(timeLeft % 60);
    // console.log(formatHours, formatMinutes, formatSeconds);
    console.log(formatHours, formatMinutes, formatSeconds);

    return { hour: formatHours, minute: formatMinutes, second: formatSeconds };
  }, [timeLeft]);

  const inputTypes: ('hour' | 'minute' | 'second')[] = useMemo(() => {
    return ['hour', 'minute', 'second'];
  }, []);

  return {
    running,
    timeLeft,
    setTimeLeft,
    handleStart,
    handleStop,
    formatTime,
    inputTypes,
    timerInputRefs,
  };
}
