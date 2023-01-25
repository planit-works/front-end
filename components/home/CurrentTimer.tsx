import { useCallback, useEffect, useState } from 'react';
export default function CurrentTimer() {
  const [time, setTime] = useState<string>('00:00');
  const currentTimer = useCallback(() => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    setTime(`${hours}:${minutes}`);
  }, []);

  useEffect(() => {
    currentTimer();
    const timer = setInterval(() => currentTimer(), 1000);
    //1초마다 currentTimer 반복

    return () => {
      clearInterval(timer);
    };
  }, [currentTimer]);

  return (
    <div>
      <p className="text-white font-medium text-9xl">{time}</p>
    </div>
  );
}
