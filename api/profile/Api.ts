import axios from 'axios';
import { MyProfileInfo } from 'types/MyInfo';
import { UserProfileList } from 'types/SearchedList';

const BaseURL: string = 'https://www.planit.p-e.kr/api';
axios.defaults.withCredentials = true;

export const updateUserProfile = async (
  nicknameData?: string,
  avatarUrlData?: string,
  bioData?: string | null,
) => {
  try {
    const { data } = await axios.patch(`${BaseURL}/profiles`, {
      nickname: nicknameData,
      avatarUrl: avatarUrlData,
      bio: bioData,
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw Error('프로필 변경에 실패하였습니다');
    }
  }
};

export const getProfile = async (id: number): Promise<MyProfileInfo> => {
  const { data } = await axios.post(`${BaseURL}/profiles`, {
    userId: id,
  });

  return data;
};

export const getUserProfileList = async (
  id: string,
): Promise<UserProfileList> => {
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
