import { useTimer } from 'hooks/useTimer';
import React from 'react';
import { useCallback } from 'react';

type TimerInputProps = {
  type: 'hour' | 'minute' | 'second';
};

const TimerInput = React.forwardRef<HTMLInputElement, TimerInputProps>(
  ({ type }: TimerInputProps, inpurRef) => {
    const { formatTime, running } = useTimer();
    const handleBlur = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const currentInputValue = e.currentTarget.value;
      e.currentTarget.value = currentInputValue.slice(0, 2).padStart(2, '0');
    }, []);
    /*focus 되었을 때 초기화 */
    const handleFocus = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.value = '';
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
            className="bg-transparent w-20"
            onBlur={handleBlur}
            onFocus={handleFocus}
            disabled={running}
          />
        )}
        {/** 타이머 작동 중이 아닐때는 span태그  */}
        {running && (
          <span className='className="bg-transparent'>{formatTime[type]}</span>
        )}
      </span>
    );
  },
);
export default TimerInput;
