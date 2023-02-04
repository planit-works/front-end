import { create } from 'zustand';

interface StopwatchState {
  running: boolean;
  elapsedTime: number;
  start: () => NodeJS.Timer;
  stop: () => void;
  reset: () => void;
}

const useStopwatchStore = create<StopwatchState>((set) => ({
  running: false,
  elapsedTime: 0,
  start: () => {
    let startTime = Date.now();
    let newIntervalId = setInterval(() => {
      set((state) => ({
        running: true,
        elapsedTime: Date.now() - startTime + state.elapsedTime,
      }));
    }, 10);
    set((state) => ({
      intervalId: newIntervalId,
      running: true,
      elapsedTime: state.elapsedTime,
    }));

    return newIntervalId;
  },
  stop: () => {
    set((state) => ({
      intervalId: null,
      running: false,
      elapsedTime: state.elapsedTime,
    }));
  },
  reset: () => {
    set((state) => ({
      intervalId: null,
      running: false,
      elapsedTime: 0,
    }));
  },
}));

export default useStopwatchStore;
