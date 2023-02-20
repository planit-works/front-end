import axios, { AxiosResponse } from 'axios';
import { AuthInfo, Profile, UserInfo } from 'types/auth';

const BaseURL: string = 'https://www.planit.p-e.kr/api';

axios.defaults.withCredentials = true;

export const createUser = async (AuthInfo: AuthInfo) => {
  try {
    const { data } = await axios.post(`${BaseURL}/auth`, AuthInfo);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Email 혹은 Password를 다시 확인해 주세요');
    }
  }
};

// eslint-disable-next-line @typescript-eslint/no-shadow
export const loginUser = async (AuthInfo: AuthInfo) => {
  try {
    const { data } = await axios.post(`${BaseURL}/auth/login`, AuthInfo);

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

export const verifyLogin = async (): Promise<UserInfo> => {
  // try {
  const { data } = await axios.get<UserInfo>(`${BaseURL}/auth/verify`);

  return data;
  // } catch (error) {
  //   if (error instanceof Error) {
  //     throw Error('세션이 만료되었습니다');
  //   }
  // }
};

export const logoutUser = async () => {
  try {
    const { data } = await axios.post(`${BaseURL}/auth/logout`);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw Error('로그아웃에 실패했습니다. 다시 시도해 주세요');
    }
  }
};
