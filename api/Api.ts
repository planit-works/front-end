import axios from 'axios';
import { AuthInfo } from 'types/auth';

const BaseURL: string = process.env.NEXT_PUBLIC_API_URL as string;
const endpoint = '/auth';

export const createUser = async (AuthInfo: AuthInfo) => {
  try {
    const response = await axios.post(`${BaseURL}${endpoint}`, AuthInfo);
    //nextjs cors 이슈를 해결하지 못했으므로 일단 하드코딩으로 네트워크 요청

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
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
      throw new Error(error.message);
    }
  }
};
