import { MyProfileInfo, ProfileReal } from 'types/MyInfo';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import produce from 'immer';

interface MyPageFormState {
  myProfile: MyProfileInfo;
  setMyProfileAllAtOnce: (value: MyProfileInfo) => void;
  setMyProfile: (value: ProfileReal) => void;
}

const myProfileInfoStore = create<MyPageFormState>()(
  devtools((set) => ({
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
    setMyProfileAllAtOnce: (value) =>
      set({
        myProfile: value,
      }),
    setMyProfile: (value) =>
      set(
        produce((state: MyPageFormState) => {
          state.myProfile.profile = value;
        }),
      ),
  })),
);

export default myProfileInfoStore;
