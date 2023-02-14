import { create } from 'zustand';

interface StopwatchState {
  running: boolean;
  elapsedTime: number;
  pausedTime: number;
  intervalId: NodeJS.Timer | undefined;
  start: () => NodeJS.Timer;
  stop: () => void;
  reset: () => void;
}

const useStopwatchStore = create<StopwatchState>((set) => ({
  running: false,
  elapsedTime: 0,
  pausedTime: 0,
  intervalId: undefined,
  start: () => {
    let startTime = Date.now();
    let newIntervalId = setInterval(() => {
      set((state) => ({
        running: true,
        elapsedTime: Date.now() - startTime + state.pausedTime,
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
      running: false,
      elapsedTime: state.elapsedTime,
      pausedTime: state.elapsedTime,
    }));
  },
  reset: () => {
    set((state) => ({
      running: false,
      elapsedTime: 0,
      pausedTime: 0,
    }));
  },
}));

export default useStopwatchStore;
