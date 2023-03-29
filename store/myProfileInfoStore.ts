import { MyProfileInfo } from 'types/MyInfo';
import { create } from 'zustand';

interface MyPageFormState {
  myProfile: MyProfileInfo;
  setMyProfile: (value: MyProfileInfo) => void;
}

const myProfileInfoStore = create<MyPageFormState>()((set) => ({
  myProfile: {
    userId: 0,
    email: '',
    profile: {
      bio: null,
      nickname: '',
      avatarUrl: '',
    },
    followerCount: null,
    followingCount: null,
    isFollowing: null,
  },
  setMyProfile: (value) =>
    set({
      myProfile: value,
    }),
}));
export default myProfileInfoStore;
