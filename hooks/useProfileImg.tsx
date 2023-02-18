import { useEffect, useState } from 'react';

export default function useProfileImg(
  imageFile: Array<File>,
  avatarUrl: string,
) {
  const [profileImg, setProfileImg] = useState<string>(avatarUrl);
  useEffect(() => {
    if (imageFile?.length) {
      // 파일 타입이 image/* 가 아닌 경우 error
      if (imageFile[0].type.search('image') < 0) {
        setProfileImg('');
      } else {
        setProfileImg(URL.createObjectURL(imageFile[0]));
      }
    } else {
      //파일 선택을 취소하면 default이미지
      setProfileImg(avatarUrl);
    }
  }, [imageFile, avatarUrl]);

  return { profileImg };
}
