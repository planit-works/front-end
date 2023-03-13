import axios from 'axios';
import { MyInfo } from 'types/MyInfo';
import { UserProfile } from 'types/UserProfie';

const BaseURL: string = 'https://www.planit.p-e.kr/api';
axios.defaults.withCredentials = true;

export const updateUserProfile = async (
  nickname?: string,
  avatarUrl?: string,
  bio?: string,
) => {
  try {
    const { data } = await axios.patch(`${BaseURL}/profiles`, {
      nickname,
      avatarUrl,
      bio,
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw Error('프로필 변경에 실패하였습니다');
    }
  }
};

export const getProfile = async (id: number): Promise<MyInfo> => {
  const { data } = await axios.post(`${BaseURL}/profiles`, {
    userId: id,
  });

  return data;
};

export const getUserProfile = async (id: string): Promise<UserProfile[]> => {
  const { data } = await axios.get(`${BaseURL}/users?q=${id}`);

  return data;
};

export const followUser = async (id: number) => {
  await axios.post(`${BaseURL}/follow`, {
    followingId: id,
  });
};

export const unfollowUser = async (id: number) => {
  await axios.delete(`${BaseURL}/follow`, {
    data: { unfollowingId: id },
  });
};
