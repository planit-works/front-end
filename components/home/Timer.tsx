import { useState, useEffect } from 'react';
import { useTimer } from '../../hooks/useTimer';

export default function Timer() {
  const { running, formatTime, timeLeft, handleStart } = useTimer();
  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [seconde, setSecond] = useState<number>(0);

  return (
    <div>
      <p className="text-3xl">{formatTime(timeLeft)}</p>
      <div>
        <button onClick={handleStart}>{running ? '시작' : '중단'}</button>
      </div>
    </div>
  );
}
