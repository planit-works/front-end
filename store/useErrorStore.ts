import { create } from 'zustand';

interface ErrorState {
  isError: boolean;
  isErrorSlider?: boolean;
  isErrorUpdateChecker?: boolean;
  setError: (value: boolean) => void;
  setErrorSlider: (value: boolean) => void;
  setErrorUpdateChecker: (value: boolean) => void;
}

const useErrorStore = create<ErrorState>()((set) => ({
  isError: true,
  isErrorSlider: undefined,
  isErrorUpdateChecker: false,
  setError: (value) =>
    set({
      isError: value,
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
