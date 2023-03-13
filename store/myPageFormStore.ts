import { create } from 'zustand';

interface MyPageFormState {
  disabledNickName: boolean;
  tabBio: boolean;
  setDisabledNickName: (value: boolean) => void;
  setTabBio: () => void;
  setDisabledAll: () => void;
}

const myPageFormStore = create<MyPageFormState>()((set) => ({
  disabledNickName: true,
  tabBio: true,
  setDisabledNickName: (value) =>
    set({
      disabledNickName: value,
    }),
  setTabBio: () =>
    set((state) => ({
      tabBio: !state.tabBio,
    })),
  setDisabledAll: () =>
    set({
      disabledNickName: true,
    }),
}));
export default myPageFormStore;
