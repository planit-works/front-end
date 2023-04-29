import { useTime } from 'hooks/useTime';

export default function CurrentTimeIndicator() {
  const { currentTime, handleClockFormat } = useTime();

  return (
    <div className="flex">
      <span
        className="text-[10em] group
      md:text-[5.5em]"
      >
        {currentTime.time}
      </span>
      <button
        className={`w-8 invisible group-hover:visible group-hover:animate-appearToRight text-white text-lg
      md:text-base md:w-6}`}
        onClick={handleClockFormat}
      >
        {`${currentTime.format}H`}
      </button>
    </div>
  );
}
