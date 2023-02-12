import { useEffect } from 'react';
import userStore from 'store/userStore';

export default function useVerifyLogin() {
  const { userProfile, setProfileVerify } = userStore();
  //새로고침하면 로그인 검증 api요청하여 전역state 업데이트
  useEffect(() => {
    setProfileVerify();
  }, [setProfileVerify]);

  return { userProfile };
}
