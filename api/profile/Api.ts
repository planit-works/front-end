import axios from 'axios';
import { MyInfo } from 'types/MyInfo';

const BaseURL: string = 'https://www.planit.p-e.kr/api';
axios.defaults.withCredentials = true;

export const updateUserProfile = async (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  nickname?: string,
  AvatarUrl?: string,
  Bio?: string,
) => {
  try {
    if (!AvatarUrl) {
      AvatarUrl = 'default';
    }
    const { data } = await axios.patch(`${BaseURL}/profiles`, {
      nickname,
      avatarUrl: `avatars/${AvatarUrl}`,
      bio: Bio,
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw Error('프로필 변경에 실패하였습니다');
    }
  }
};

export const getMyProfile = async (id: number): Promise<MyInfo> => {
  const { data } = await axios.post(`${BaseURL}/profiles`, {
    userId: id,
  });

  return data;
};
