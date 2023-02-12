import {
  getPresignedUrl,
  updateUserProfile,
  uploadProfileImg,
} from 'api/auth/Api';
import { useForm } from 'react-hook-form';
import { ProfileFormField } from 'types/auth';
import { useRouter } from 'next/router';
import AuthSubmitBtn from 'components/auth/authSubmitBtn';
import { useState, useEffect } from 'react';
import { JoinNickNameErrMsg, JoinProfileImgErrMsg } from '../joinErrMsg';
import useProfileImg from 'hooks/useProfileImg';
import userStore from 'store/userStore';
import useVerifyLogin from 'hooks/useVerifyLogin';

export default function ProfileForm() {
  const [disableBtn, setDisable] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getFieldState,
    watch,
    setError,
    reset,
    formState: { isDirty, dirtyFields, errors },
  } = useForm<ProfileFormField>({
    mode: 'onChange',
    defaultValues: {
      imageFile: undefined,
      nickName: 'Loading..',
    },
  });
  const imageFile: Array<File> = watch('imageFile');
  useVerifyLogin(); //새로고침하면 유저 로그인 검증 후 전역state에 넣음
  const { userProfile } = userStore();
  const { profileImg } = useProfileImg(imageFile, userProfile.avatarUrl);

  useEffect(() => {
    //전역state인 userProfile이 존재하면 input의 defaultValue를 reset
    reset({ nickName: userProfile.nickname });
  }, [reset, userProfile]);

  const updateNickNameOnly = async ({
    imageFile,
    nickName,
  }: ProfileFormField) => {
    if (!imageFile[0]) {
      //아무 파일도 없는 경우
      await updateUserProfile(nickName); //닉네임만 업데이트
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
      setDisable(true);
      await updateNickNameOnly(fieldValues);
      const AvatarUrl = await uploadS3(fieldValues);
      await updateUserProfile(fieldValues.nickName, AvatarUrl);
      router.push('/');
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
          <input
            type="file"
            accept="image/gif, image/jpeg, image/png"
            className="w-[30rem]"
            {...register('imageFile')}
          />
        </div>
        <JoinProfileImgErrMsg
          error={errors}
          checkDirty={getFieldState('imageFile').isDirty}
        />
        <input
          type="text"
          className=" block bg-transparent w-[30rem] h-12 mt-8 border-solid border-b-[1px] border-b-white focus:outline-none focus:border-sky-500 text-white text-2xl"
          placeholder="Nickname을 입력해 주세요"
          {...register('nickName', {
            validate: {
              checkLength: (value) => value.length >= 2 && value.length <= 10,
            },
          })}
        />
        <JoinNickNameErrMsg
          error={errors}
          checkDirty={getFieldState('nickName').isDirty}
        />
        <AuthSubmitBtn btnName="Submit" disable={disableBtn} />
      </form>
    </div>
  );
}
