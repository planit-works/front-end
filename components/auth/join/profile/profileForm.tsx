import {
  getPresignedUrl,
  updateUserProfile,
  uploadProfileImg,
} from 'api/auth/Api';
import { useForm } from 'react-hook-form';
import { Profile, ProfileFormField } from 'types/auth';
import { useRouter } from 'next/router';
import AuthSubmitBtn from 'components/auth/authSubmitBtn';
import { useState } from 'react';
import { JoinNickNameErrMsg, JoinProfileImgErrMsg } from '../joinErrMsg';
import useProfileImg from 'hooks/useProfileImg';
import useVerifyLogin from 'hooks/useVerifyLogin';
import { InputImgFile, InputNickName } from 'components/inputText';
import { useUpdateProfile } from './../../../../react-query/useUpdateProfile';
import { useQueryClient } from '@tanstack/react-query';
import QueryKey from 'react-query/key';

export default function ProfileForm() {
  const [disableBtn, setDisable] = useState(false);

  const {
    handleSubmit,
    getFieldState,
    watch,
    setError,
    control,
    formState: { isDirty, dirtyFields, errors },
  } = useForm<ProfileFormField>({
    mode: 'onChange',
    defaultValues: {
      imageFile: undefined,
      nickName: '',
    },
  });
  const imageFile: Array<File> = watch('imageFile');
  const mutate = useUpdateProfile();

  const queryClient = useQueryClient();
  const queryClientAvatarUrl = queryClient.getQueryData<Profile>([
    QueryKey.getLoginedUser,
  ])?.avatarUrl as string;
  const queryClientNickName = queryClient.getQueryData<Profile>([
    QueryKey.getLoginedUser,
  ])?.nickname as string;

  const { profileImg } = useProfileImg(imageFile, queryClientAvatarUrl);

  const updateNickNameOnly = async ({
    imageFile,
    nickName,
  }: ProfileFormField) => {
    if (!imageFile) {
      //아무 파일도 없는 경우
      // await updateUserProfile(nickName); //닉네임만 업데이트
      mutate({
        nickName,
      });
      throw new Error('등록된 파일이 없습니다. 기본 이미지로 등록됩니다');
    } else if (imageFile[0].type.search('image') < 0) {
      //파일 형식이 이미지가 아닌 경우
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
      // checkFileType(fieldValues);
      const AvatarUrl = await uploadS3(fieldValues);
      mutate({ nickName: fieldValues.nickName, AvatarUrl });
      // await updateUserProfile(fieldValues.nickName, AvatarUrl);
    } catch (error) {
      if (error instanceof Error) {
        handleError(error);
      }
    }
  };

  return (
    <div className="animate-profileAtter opacity-0 ">
      <form onSubmit={handleSubmit(onValid)}>
        <div className="flex flex-row flex-wrap w-[30rem] justify-center items-center overflow-hidden">
          <img
            src={profileImg}
            alt="기본 프로필"
            className="w-[30rem] h-[25rem] my-2 rounded-[8%]"
          />
          <InputImgFile control={control} />
        </div>
        <JoinProfileImgErrMsg
          error={errors}
          checkDirty={getFieldState('imageFile').isDirty}
        />
        <InputNickName control={control} defaultValue={queryClientNickName} />
        <JoinNickNameErrMsg
          error={errors}
          checkDirty={getFieldState('nickName').isDirty}
        />
        <AuthSubmitBtn btnName="Submit" disable={disableBtn} />
      </form>
    </div>
  );
}
