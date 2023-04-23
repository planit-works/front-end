import { create } from 'zustand';

interface ErrorState {
  isErrorLogined: boolean;
  isErrorSlider?: boolean;
  isErrorUpdateChecker?: boolean;
  setErrorLogined: (value: boolean) => void;
  setErrorSlider: (value: boolean) => void;
  setErrorUpdateChecker: (value: boolean) => void;
}

const useErrorStore = create<ErrorState>()((set) => ({
  isErrorLogined: true,
  isErrorSlider: undefined,
  isErrorUpdateChecker: false,
  setErrorLogined: (value) =>
    set({
      isErrorLogined: value,
    }),
  setErrorSlider: (value) =>
    set({
      isErrorSlider: value,
    }),
  setErrorUpdateChecker: (value) =>
    set({
      isErrorUpdateChecker: value,
    }),
}));
export default useErrorStore;
