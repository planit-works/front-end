import { useTimer } from 'hooks/useTimer';
import React from 'react';
import { useCallback } from 'react';

type TimerInputProps = {
  type: 'hour' | 'minute' | 'second';
};

const TimerInput = React.forwardRef<HTMLInputElement, TimerInputProps>(
  ({ type }: TimerInputProps, inpurRef) => {
    const { formatTime, running } = useTimer();
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentInputValue = e.currentTarget.value;
        if (currentInputValue.length < 2) {
          e.currentTarget.value = currentInputValue.toString().padStart(2, '0');
        }
      },
      [],
    );

    return (
      <span>
        {/** 타이머 작동 중이 아닐때는 input  */}
        {!running && (
          <input
            ref={inpurRef}
            type="number"
            min="0"
            max="59"
            defaultValue={formatTime[type]}
            className="bg-transparent w-24"
            onChange={handleChange}
            disabled={running}
          />
        )}
        {/** 타이머 작동 중이 아닐때는 span태그  */}
        {running && (
          <span className='className="bg-transparent w-24"'>
            {formatTime[type]}
          </span>
        )}
      </span>
    );
  },
);
export default TimerInput;
