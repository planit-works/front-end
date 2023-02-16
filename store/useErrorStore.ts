import { create } from 'zustand';

interface ErrorState {
  isError: boolean;
  setError: (value: boolean) => void;
}

const useErrorStore = create<ErrorState>()((set) => ({
  isError: true,
  setError: (value) =>
    set({
      isError: value,
    }),
}));
export default useErrorStore;
