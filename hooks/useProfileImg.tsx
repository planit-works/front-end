import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { verifyLogin } from 'api/auth/Api';

export default function useProfileImg(imageFile: Array<File>) {
  const router = useRouter();
  const [profileImg, setProfileImg] = useState<string>(
    router.query.avatarUrl as string,
  );
  useEffect(() => {
    verifyLogin();
    if (imageFile?.length) {
      // 파일 타입이 image/* 가 아닌 경우 error
      if (imageFile[0].type.search('image') < 0) {
        setProfileImg('');
      } else {
        setProfileImg(URL.createObjectURL(imageFile[0]));
      }
    } else {
      setProfileImg(router.query.avatarUrl as string);
    }
  }, [imageFile]);

  return { profileImg };
}
