import { getPresignedUrl, uploadProfileImg } from 'api/auth/Api';
import { useForm } from 'react-hook-form';
import { ProfileFormField, UserInfo } from 'types/auth';
import { useState } from 'react';
import { NickNameErrMsg, ProfileImgErrMsg } from '../../FormErrMsg';
import {
  InputImgFile,
  InputNickName,
} from 'components/auth/join/profile/InputProfile';
import { useUpdateProfile } from '../../../../react-query/profile/useUpdateProfile';
import { useQueryClient } from '@tanstack/react-query';
import QueryKey from 'react-query/react-key';
import SliderUpdateChecker from 'components/sliderUpdateChecker';
import useProfileImg from 'hooks/useProfileImg';
import AuthSubmitBtn from 'components/auth/AuthSubmitBtn';

export default function ProfileForm() {
  const [disableBtn, setDisable] = useState(false);

  const {
    handleSubmit,
    getFieldState,
    watch,
    setError,
    control,
    formState: { errors },
  } = useForm<ProfileFormField>({
    mode: 'onChange',
    defaultValues: {
      imageFile: undefined,
      nickname: '',
    },
  });
  const imageFile: Array<File> = watch('imageFile');
  const mutate = useUpdateProfile();

  const queryClient = useQueryClient();
  const queryClientAvatarUrl = queryClient.getQueryData<UserInfo>([
    QueryKey.getLoginedUser,
  ])?.profile.avatarUrl as string;

  const { profileImg } = useProfileImg(imageFile, queryClientAvatarUrl);

  const updateNickNameOnly = async ({
    imageFile,
    nickname,
  }: ProfileFormField) => {
    if (!imageFile) {
      //아무 파일도 없는 경우 닉네임만 업데이트
      mutate({
        nickname,
      });
      throw new Error('등록된 파일이 없습니다. 기본 이미지로 등록됩니다');
    }
  };

  const checkFile = ({ imageFile }: ProfileFormField) => {
    //file은 존재하지만 image/* 형식이 아닌 경우
    if (imageFile.length > 0 && imageFile[0].type.search('image') < 0) {
      setError(`imageFile`, {
        type: `imageFile`,
      });
      throw new Error('이미지 형식의 파일을 등록해주세요');
    }
  };

  const uploadS3 = async ({ imageFile }: ProfileFormField) => {
    const EndPoint: string = await getPresignedUrl(); //presignedUrl 추출
    await uploadProfileImg(EndPoint, imageFile[0]); //s3에 업로드

    return EndPoint.substring(0, EndPoint.indexOf('?')); //EndPoint에서 ? 앞 숫자들만 추출
  };

  const handleError = (error: Error) => {
    setDisable(false);
    alert(error.message);
  };

  const onValid = async (fieldValues: ProfileFormField) => {
    try {
      await updateNickNameOnly(fieldValues);
      checkFile(fieldValues);
      const avatarUrl = await uploadS3(fieldValues);
      mutate({ nickname: fieldValues.nickname, avatarUrl });
    } catch (error) {
      if (error instanceof Error) {
        handleError(error);
      }
    }
  };

  return (
    <div className="relative flex flex-col jusify-center items-center animate-profileAtter opacity-0 ">
      <form onSubmit={handleSubmit(onValid)}>
        <div className="flex flex-row flex-wrap w-[30rem] justify-center items-center overflow-hidden">
          <img
            src={profileImg}
            alt="기본 프로필"
            className="w-[30rem] h-[25rem] my-2 rounded-[8%]"
          />
          <InputImgFile control={control} />
        </div>
        <ProfileImgErrMsg
          error={errors}
          checkDirty={getFieldState('imageFile').isDirty}
        />
        <InputNickName control={control} />
        <NickNameErrMsg
          error={errors}
          checkDirty={getFieldState('nickname').isDirty}
        />
        <AuthSubmitBtn btnName="Submit" disable={disableBtn} />
      </form>
      <SliderUpdateChecker />
    </div>
  );
}
