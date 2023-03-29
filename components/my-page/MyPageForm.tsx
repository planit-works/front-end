import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useGetLoginedUser } from 'react-query/useGetLoginedUser';
import {
  InputMyBio,
  InputMyEmail,
  InputMyImgFile,
  InputMyNickName,
} from './InputMyPage';
import { MyPageFormField } from 'types/MyInfo';
import { useGetMyProfile } from 'react-query/profile/useGetMyProfile';

import sliderStore from 'store/sliderStore';
import { useUpdateProfile } from 'react-query/profile/useUpdateProfile';
import { getPresignedUrl, uploadProfileImg } from 'api/aws/Api';
import useProfileImg from 'hooks/useProfileImg';
import { NickNameErrMsg, ProfileImgErrMsg } from 'components/auth/FormErrMsg';
import SliderChecker from 'components/SliderFormChecker';
import SliderUpdateChecker from 'components/SliderUpdateChecker';
import myProfileInfoStore from 'store/myProfileInfoStore';
import FollowList from 'components/user-page/UserFollow';
import { getSerialNumFromUrl } from 'utils/getSerialNumFromUrl';

export default function MyProfileForm() {
  const { myProfile } = myProfileInfoStore();
  const { setFormSlider } = sliderStore();
  const {
    handleSubmit,
    watch,
    control,
    setError,
    getFieldState,
    reset,
    formState: { errors },
  } = useForm<MyPageFormField>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      imageFile: undefined,
      nickname: '',
      bio: '',
    },
  });
  const { userId } = useGetLoginedUser();
  const mutateGetProfile = useGetMyProfile();
  const imageFile = watch('imageFile');
  const mutateUserProfile = useUpdateProfile();

  useEffect(() => {
    //userId가 들어오면 유저 정보 불러온다. 유저정보는 myProfileInfoStore()에 저장된다.
    if (userId) {
      mutateGetProfile.mutate(userId);
    }
  }, [userId]);

  const { profileImg } = useProfileImg(imageFile, myProfile?.profile.avatarUrl);

  useEffect(() => {
    //myProfileInfoStore()에 저장되어 있는 값들을 input들의 default값으로 설정한다.
    //react-hook-form의 input들을 control로 모듈화하였기에 해당 작업이 필요
    reset({
      imageFile: undefined,
      nickname: myProfile?.profile.nickname,
      email: myProfile?.email,
      bio: myProfile?.profile.bio,
    });
  }, [myProfile?.profile]);

  const updateProfileWithOutImg = async (
    nickname: string,
    bio: string | null | undefined,
  ) => {
    //아무 파일도 없는 경우 닉네임, bio만 업데이트
    mutateUserProfile.mutate({
      nicknameData: nickname,
      avatarUrlData: myProfile.profile.avatarUrl.substring(
        myProfile.profile.avatarUrl.indexOf('/') + 1, //avatars/... 에서 / 뒤의 숫자들만 추출
      ),
      bioData: bio === '' ? null : bio,
    });

    throw new Error('등록된 파일이 없습니다. 기본 이미지로 등록됩니다');
  };

  const updateProfileWithImg = async (
    imageFile: File[],
    nickname: string,
    bio: string | null | undefined,
  ) => {
    const EndPoint: string = await getPresignedUrl();
    await uploadProfileImg(EndPoint, imageFile[0]);
    const AvatarUrl = getSerialNumFromUrl(EndPoint);
    mutateUserProfile.mutate({
      nicknameData: nickname,
      avatarUrlData: AvatarUrl,
      bioData: bio === '' ? null : bio,
    });
  };

  const handleError = (error: Error) => {
    alert(error.message);
    setFormSlider(false);
  };

  const checkImgFileType = (imageFile: File[]) => {
    if (!imageFile[0].type.includes('image')) {
      setError(`imageFile`, {
        type: `imageFile`,
      });
      throw Error('이미지 형식의 파일만 등록할 수 있습니다');
    }
  };

  const onValid = async ({ imageFile, nickname, bio }: MyPageFormField) => {
    try {
      //이미지 파일이 등록된 경우
      if (imageFile && imageFile.length) {
        checkImgFileType(imageFile); //파일은 있으나 이미지 파일이 아닌 경우
        await updateProfileWithImg(imageFile, nickname, bio);
      } else {
        //파일이 등록되지 않은 경우
        await updateProfileWithOutImg(nickname, bio);
      }
    } catch (error) {
      if (error instanceof Error) {
        handleError(error);
      }
    }
  };

  return (
    <div className="flex relative right-64 flex-col justify-center items-center">
      <form onSubmit={handleSubmit(onValid)} className="relative">
        <img
          src={profileImg}
          alt="기본 프로필"
          className="w-[25rem] h-[20rem] my-2 rounded-[8%]"
        />
        <InputMyImgFile control={control} />
        <ProfileImgErrMsg
          error={errors}
          checkDirty={getFieldState('imageFile').isDirty}
        />
        <FollowList
          follow={myProfile?.followingCount}
          follower={myProfile?.followerCount}
        />
        <InputMyEmail defaultValue={myProfile?.email} />
        <InputMyNickName
          control={control}
          defaultValue={myProfile?.profile.nickname}
        />
        <NickNameErrMsg
          error={errors}
          checkDirty={getFieldState('nickname').isDirty}
        />
        <InputMyBio control={control} defaultValue={myProfile?.profile.bio} />

        <SliderChecker />
      </form>
      <SliderUpdateChecker />
    </div>
  );
}
