import { useEffect } from 'react';
import userStore from 'store/userStore';

export default function useVerifyLogin() {
  const { userProfile, setProfileVerify } = userStore();

  useEffect(() => {
    setProfileVerify();
  }, [setProfileVerify]);

  return { userProfile };
}
