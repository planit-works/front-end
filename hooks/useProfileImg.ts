import { useEffect, useState } from 'react';
import sliderStore from 'store/sliderStore';

export default function useProfileImg(
  imageFile: Array<File>,
  avatarUrl: string | undefined,
) {
  const [profileImg, setProfileImg] = useState<string>('');
  const { setHidden } = sliderStore();
  useEffect(() => {
    if (imageFile?.length) {
      // 파일 타입이 image/* 가 아닌 경우(등록한 파일이 이미지 파일이 아닌 경우)
      if (!imageFile[0].type.includes('image')) {
        setProfileImg('');
        setHidden(true);
        alert('이미지 형식의 파일을 등록해주세요');
      } else {
        setProfileImg(URL.createObjectURL(imageFile[0]));
      }
    } else {
      //파일 선택을 취소하면 기존 이미지
      avatarUrl &&
        setProfileImg(process.env.NEXT_PUBLIC_IMG_ORIGIN + avatarUrl);
    }
  }, [imageFile, avatarUrl, setHidden]);

  return { profileImg, setProfileImg };
}
