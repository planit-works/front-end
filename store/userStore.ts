/* eslint-disable import/no-extraneous-dependencies */
import { create } from 'zustand';
import produce from 'immer';
import { Profile } from 'types/auth';
import { verifyLogin } from 'api/auth/Api';
// import { devtools, persist } from 'zustand/middleware';

interface UserState {
  userProfile: { nickname: string; avatarUrl: string };
  setNickame: (value: string) => void;
  setImg: (value: string) => void;
  setProfile: (value: Profile) => void;
  setProfileVerify: () => void;
}

const userStore = create<UserState>((set) => ({
  userProfile: { nickname: '', avatarUrl: '' },
  setImg: (value: string) =>
    set(
      produce((state) => {
        state.userProfile.avatarurl = value;
      }),
    ),
  setNickame: (value: string) =>
    set(
      produce((state) => {
        state.userProfile.nickname = value;
      }),
    ),
  setProfile: (value: Profile) => {
    set(
      produce((state) => {
        state.userProfile = value;
      }),
    );
  },
  setProfileVerify: async () => {
    //비동기로 로그인 내역 검증하고 데이터 업데이트
    const userProfile = await verifyLogin();

    set(
      produce((state) => {
        state.userProfile = { ...userProfile };
      }),
    );
  },
}));

export default userStore;
