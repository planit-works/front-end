import { addLeadingZero } from 'utils/time';
import useTimerStore from '../store/timerStore';
import useSound from 'use-sound';
import { useCallback, useEffect, useMemo, useRef } from 'react';

export function useTimer() {
  const { running, timeLeft, setTimeLeft, start, end, stop, intervalId } =
    useTimerStore();
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
  const handleStart = useCallback(() => {
    setTimeLeft(getTimeFromInput());
    // if (timeLeft === 0) return;
    start();
  }, [getTimeFromInput, setTimeLeft, start]);
  /**중단 시 이벤트 핸들러*/
  const handleStop = () => {
    stop();
  };
  const [playEndAlarm] = useSound('/sounds/alarm.mp3', { volume: 0.25 });

  /**타이머가 0이 되었을 때 발생하는 이벤트 핸들러*/
  const handleEnd = useCallback(() => {
    playEndAlarm();
    end();
  }, [end, playEndAlarm]);
  /**분 추가 */
  const addMinutes = useCallback((minutes: number) => {
    if (timerInputRefs.current[1]) {
      const currentMinutes = timerInputRefs.current[1].value;
      const sumMinutes = parseInt(currentMinutes) + minutes;
      if (sumMinutes >= 60 && timerInputRefs.current[0]) {
        const currentHours = timerInputRefs.current[0].value;
        timerInputRefs.current[0].value = addLeadingZero(
          parseInt(currentHours) + Math.floor(sumMinutes / 60),
        );
      }
      timerInputRefs.current[1].value = addLeadingZero(sumMinutes % 60);
    }
  }, []);
  useEffect(() => {
    //0이 되었을 때, 타이머 종료
    if (running && intervalId && timeLeft <= 0) {
      handleEnd();
    }
  }, [handleEnd, intervalId, running, timeLeft]);
  /**타이머 남은 시간을, hour, minute, second로 분류 */
  const formatTime = useMemo(() => {
    const formatHours = addLeadingZero(Math.floor(timeLeft / 3600));
    const formatMinutes = addLeadingZero(Math.floor((timeLeft % 3600) / 60));
    const formatSeconds = addLeadingZero(timeLeft % 60);

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
    addMinutes,
    formatTime,
    inputTypes,
    timerInputRefs,
  };
}
