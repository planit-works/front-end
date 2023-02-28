import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useGetLoginedUser } from 'react-query/useGetLoginedUser';
import { useQueryClient } from '@tanstack/react-query';
import QueryKey from 'react-query/key';
import {
  InputMyBio,
  InputMyEmail,
  InputMyImgFile,
  InputMyNickName,
} from './InputMyPage';
import { MyInfo, MyPageFormField } from 'types/MyInfo';
import { useGetMyProfile } from 'react-query/useGetMyProfile';
import SliderChecker from 'components/sliderFormChecker';
import useErrorStore from 'store/useErrorStore';
import { useUpdateProfile } from 'react-query/useUpdateProfile';
import { getPresignedUrl, uploadProfileImg } from 'api/auth/Api';
import SliderUpdateChecker from 'components/sliderUpdateChecker';
import useProfileImg from 'hooks/useProfileImg';
import { NickNameErrMsg, ProfileImgErrMsg } from 'components/auth/FormErrMsg';

export default function MyProfileForm() {
  const { setErrorSlider } = useErrorStore();
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
  const { userInfo } = useGetLoginedUser();
  const queryClient = useQueryClient();
  const mutateAsync = useGetMyProfile();
  const imageFile = watch('imageFile');
  const mutate = useUpdateProfile();

  useEffect(() => {
    //userInfo.id가 들어오면 함수 실행. 유저 정보가 바뀌면(업데이트 성공) 실행.
    if (userInfo?.userId) {
      mutateAsync(userInfo?.userId);
      reset({
        imageFile: undefined,
      });
    }
  }, [mutateAsync, reset, userInfo?.userId]);
  const queryClientEmail = queryClient.getQueryData<MyInfo>([
    QueryKey.getMyProfile,
  ])?.email as string;
  let queryClientNickName = queryClient.getQueryData<MyInfo>([
    QueryKey.getMyProfile,
  ])?.profile.nickname as string;
  const queryClientBio = queryClient.getQueryData<MyInfo>([
    QueryKey.getMyProfile,
  ])?.profile.bio as string;
  let queryClientAvatarUrl = queryClient.getQueryData<MyInfo>([
    QueryKey.getMyProfile,
  ])?.profile.avatarUrl as string;
  let queryClientFollower = queryClient.getQueryData<MyInfo>([
    QueryKey.getMyProfile,
  ])?.followerCount as number;
  let queryClientFollowing = queryClient.getQueryData<MyInfo>([
    QueryKey.getMyProfile,
  ])?.followingCount as number;
  const { profileImg } = useProfileImg(imageFile, queryClientAvatarUrl);

  useEffect(() => {
    //queryClient에 저장된 값들이 udefined 상태에서 바뀌었을 때 실행
    reset({
      imageFile: undefined,
      nickname: queryClientNickName,
      email: queryClientEmail,
      bio: queryClientBio,
    });
  }, [queryClientBio, queryClientEmail, queryClientNickName, reset]);

  useEffect(() => {
    //input의 값들이 기존과 달라졌을 때 실행.
    if (
      (watch('nickname') !== '' && watch('nickname') !== queryClientNickName) ||
      (profileImg && !profileImg.includes(queryClientAvatarUrl)) ||
      (watch('bio') !== '' && watch('bio') !== queryClientBio)
    ) {
      setErrorSlider(true);
    } else {
      setErrorSlider(false);
    }
  }, [
    queryClientNickName,
    profileImg,
    queryClientAvatarUrl,
    queryClientBio,
    watch('nickname'),
    watch('bio'),
  ]);

  const updateNickNameBioOnly = async ({
    imageFile,
    nickname,
    bio,
  }: MyPageFormField) => {
    if (!imageFile) {
      //아무 파일도 없는 경우 닉네임만 업데이트
      mutate({
        nickname,
        avatarUrl: queryClientAvatarUrl.substring(
          queryClientAvatarUrl.indexOf('/') + 1, //avatars/... 에서 / 뒤의 숫자들만 추출
        ),
        bio,
      });
      throw new Error('등록된 파일이 없습니다. 기본 이미지로 등록됩니다');
    }
  };

  const checkFile = ({ imageFile }: MyPageFormField) => {
    //file은 존재하지만 image/* 형식이 아닌 경우
    if (imageFile.length > 0 && imageFile[0].type.search('image') < 0) {
      setError(`imageFile`, {
        type: `imageFile`,
      });
      throw new Error('이미지 형식의 파일을 등록해주세요');
    }
  };

  const uploadS3 = async ({ imageFile }: MyPageFormField) => {
    const EndPoint: string = await getPresignedUrl(); //presignedUrl 추출
    await uploadProfileImg(EndPoint, imageFile[0]); //s3에 업로드

    return EndPoint.substring(0, EndPoint.indexOf('?')); //EndPoint에서 ? 앞 숫자들만 추출
  };

  const handleError = (error: Error) => {
    alert(error.message);
  };

  const onValid = async (fieldValues: MyPageFormField) => {
    try {
      await updateNickNameBioOnly(fieldValues);
      checkFile(fieldValues);
      const avatarUrl = await uploadS3(fieldValues);
      mutate({
        nickname: fieldValues.nickname,
        avatarUrl,
        bio: fieldValues.bio,
      });
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
        <div className="flex justify-center items-center [&>p]:mx-8">
          <p className="text-white text-2xl">팔로우: {queryClientFollowing}</p>
          <p className="text-white text-2xl">팔로워: {queryClientFollower}</p>
        </div>
        <InputMyEmail defaultValue={queryClientEmail} />
        <InputMyNickName control={control} defaultValue={queryClientNickName} />
        <NickNameErrMsg
          error={errors}
          checkDirty={getFieldState('nickname').isDirty}
        />
        <InputMyBio control={control} defaultValue={queryClientBio} />

        <SliderChecker />
      </form>
      <SliderUpdateChecker />
    </div>
  );
}
