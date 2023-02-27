import { create } from 'zustand';
import produce from 'immer';

interface TimerState {
  running: boolean;
  intervalId: NodeJS.Timer | undefined;
  timeLeft: number;
  setTimeLeft: (value: number) => void;
  start: () => NodeJS.Timer;
  end: () => void;
  clearIntervalId: () => void;
}

const useTimerStore = create<TimerState>((set) => ({
  running: false,
  intervalId: undefined,
  timeLeft: 3,
  setTimeLeft: (value) => {
    set((state) => ({ ...state, timeLeft: value }));
  },
  start: () => {
    let newIntervalId = setInterval(() => {
      set(
        produce((state: TimerState) => {
          state.timeLeft--;
        }),
      );
    }, 1000);
    set(
      produce((state: TimerState) => {
        state.running = true;
        state.intervalId = newIntervalId;
      }),
    );

    return newIntervalId;
  },
  end: () => {
    set(
      produce((state: TimerState) => {
        state.running = false;
      }),
    );
  },
  clearIntervalId: () => {
    set(
      produce((state: TimerState) => {
        state.intervalId = undefined;
      }),
    );
  },
}));

export default useTimerStore;
