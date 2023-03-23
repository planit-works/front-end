import { MyProfileInfo } from 'types/MyInfo';
import { create } from 'zustand';

interface MyPageFormState {
  myProfile: MyProfileInfo | undefined;
  setMyProfile: (value: MyProfileInfo) => void;
}

const myProfileInfoStore = create<MyPageFormState>()((set) => ({
  myProfile: undefined,
  setMyProfile: (value) =>
    set({
      myProfile: value,
    }),
}));
export default myProfileInfoStore;
