import { create } from 'zustand';

interface DisabledState {
  disabledNickName: boolean;
  disabledBio: boolean;
  setDisabledNickName: (value: boolean) => void;
  setDisabledBio: (value: boolean) => void;
  setDisabledAll: () => void;
}

const useDisabledStore = create<DisabledState>()((set) => ({
  disabledNickName: true,
  disabledBio: true,
  setDisabledNickName: (value) =>
    set({
      disabledNickName: value,
    }),
  setDisabledBio: (value) =>
    set({
      disabledBio: value,
    }),
  setDisabledAll: () =>
    set({
      disabledNickName: true,
      disabledBio: true,
    }),
}));
export default useDisabledStore;
