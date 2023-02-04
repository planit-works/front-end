import { useRef, useCallback } from 'react';
import useStopwatchStore from 'store/stopWatchStore';

export function useStopwatch() {
  const { start, stop, reset } = useStopwatchStore();
  const intercalIdRef = useRef<NodeJS.Timer>();
  const handleStart = () => {
    intercalIdRef.current = start();
  };
  const handleStop = useCallback(() => {
    if (intercalIdRef.current) {
      clearInterval(intercalIdRef.current);
    }
    stop();
  }, [stop]);

  const handleReset = () => {
    if (intercalIdRef.current) {
      clearInterval(intercalIdRef.current);
    }
    reset();
  };

  return { handleReset, handleStart, handleStop };
}
