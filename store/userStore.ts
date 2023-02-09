/* eslint-disable import/no-extraneous-dependencies */
import { create } from 'zustand';
import produce from 'immer';

interface UserState {
  profile: { nickname: string; avatarurl: string };
  setNickame: (value: string) => void;
  setProfileImg: (value: string) => void;
}

const userStore = create<UserState>((set) => ({
  profile: { nickname: '', avatarurl: '' },
  setProfileImg: (value: string) =>
    set(
      produce((state) => {
        state.profile.avatarurl = value;
      }),
    ),
  setNickame: (value: string) =>
    set(
      produce((state) => {
        state.profile.nickname = value;
      }),
    ),
}));

export default userStore;
