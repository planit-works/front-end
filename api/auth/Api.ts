import axios from 'axios';
import { AuthInfo, LoginedUserInfo } from 'types/auth';

const BaseURL: string = 'https://www.planit.p-e.kr/api';

axios.defaults.withCredentials = true;

export const createUser = async (authInfo: AuthInfo) => {
  try {
    const { data } = await axios.post(`${BaseURL}/auth`, authInfo);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Email 혹은 Password를 다시 확인해 주세요');
    }
  }
};

export const loginUser = async (authInfo: AuthInfo) => {
  try {
    const { data } = await axios.post(`${BaseURL}/auth/login`, authInfo);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw Error('Email 혹은 Password를 다시 확인해 주세요');
    }
  }
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

export const verifyLogin = async (): Promise<LoginedUserInfo> => {
  // try {
  const { data } = await axios.get<LoginedUserInfo>(`${BaseURL}/auth/verify`);

  return data;
  // } catch (error) {
  //   if (error instanceof Error) {
  //     throw Error('세션이 만료되었습니다');
  //   }
  // }
};
