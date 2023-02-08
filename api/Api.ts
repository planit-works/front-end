import axios from 'axios';
import { AuthInfo } from 'types/auth';

const BaseURL: string = 'http://localhost:8000';

const endpoint = '/auth';
axios.defaults.withCredentials = true;

export const createUser = async (AuthInfo: AuthInfo) => {
  try {
    const response = await axios.post(`${BaseURL}${endpoint}`, AuthInfo);
    //nextjs cors 이슈를 해결하지 못했으므로 일단 하드코딩으로 네트워크 요청

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Email 혹은 Password를 다시 확인해 주세요');
    }
  }
};

export const loginUser = async (AuthInfo: AuthInfo) => {
  try {
    const response = await axios.post(`${BaseURL}${endpoint}/login`, AuthInfo);
    //nextjs cors 이슈를 해결하지 못했으므로 일단 하드코딩으로 네트워크 요청

    return response.data;
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
    const response = await axios.put(`/upload-s3/${EndPoint}`, File);

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw Error('이미지 업로드에 실패하였습니다');
    }
  }
};

export const updateUserProfile = async (
  AvatarUrl: string,
  NickName: string,
) => {
  try {
    const response = await axios.patch(`${BaseURL}/users/profile`, {
      nickname: NickName,
      avatarUrl: `avatars/${AvatarUrl}`,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw Error('프로필 변경에 실패하였습니다');
    }
  }
};
