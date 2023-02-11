import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { verifyLogin } from 'api/auth/Api';
import userStore from 'store/userStore';

export default function useProfileImg(
  imageFile: Array<File>,
  routerAvatarUrl: string,
) {
  const router = useRouter();
  const { setProfile, userProfile } = userStore();
  const [profileImg, setProfileImg] = useState<string>(routerAvatarUrl);

  useEffect(() => {
    if (imageFile?.length) {
      // 파일 타입이 image/* 가 아닌 경우 error
      if (imageFile[0].type.search('image') < 0) {
        setProfileImg('');
      } else {
        setProfileImg(URL.createObjectURL(imageFile[0]));
      }
    } else {
      setProfileImg(userProfile.avatarUrl);
    }
  }, [imageFile]);

  return { profileImg };
}
