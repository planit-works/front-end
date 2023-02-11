import axios, { AxiosResponse } from 'axios';
import { AuthInfo, Profile, UserInfo } from 'types/auth';

const BaseURL: string = 'http://localhost:8000';

const endpoint = '/auth';
axios.defaults.withCredentials = true;

export const createUser = async (AuthInfo: AuthInfo) => {
  try {
    const { data } = await axios.post(`${BaseURL}${endpoint}`, AuthInfo);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Email 혹은 Password를 다시 확인해 주세요');
    }
  }
};

export const loginUser = async (AuthInfo: AuthInfo) => {
  try {
    const { data } = await axios.post(`${BaseURL}${endpoint}/login`, AuthInfo);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw Error('Email 혹은 Password를 다시 확인해 주세요');
    }
  }
};

export const getPresignedUrl = async () => {
  const S3FolderName = 'avatars';
  try {
    const { data } = await axios.post(`/getPresignedUrl`, {
      folder: `${S3FolderName}`,
    });
    const endpoint = data.substring(
      data.indexOf(`${S3FolderName}`) + (`${S3FolderName}`.length + 1),
    );

    return endpoint;
  } catch (error) {
    if (error instanceof Error) {
      throw Error('이미지 업로드에 실패하였습니다');
    }
  }
};

export const uploadProfileImg = async (EndPoint: string, File: File) => {
  try {
    const { data } = await axios.put(`/upload-s3/${EndPoint}`, File, {
      headers: {
        'Content-Type': File?.type,
      },
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw Error('이미지 업로드에 실패하였습니다');
    }
  }
};

export const updateUserProfile = async (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  NickName: string,
  AvatarUrl = 'default',
) => {
  try {
    const { data } = await axios.patch(`${BaseURL}/users/profile`, {
      nickname: NickName,
      avatarUrl: `avatars/${AvatarUrl}`,
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw Error('프로필 변경에 실패하였습니다');
    }
  }
};

export const verifyLogin = async (): Promise<Profile> => {
  const { data } = await axios.get<UserInfo>(`${BaseURL}/auth/verify`);

  return data.profile;
};
