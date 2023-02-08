import {
  getPresignedUrl,
  loginUser,
  updateUserProfile,
  uploadProfileImg,
} from 'api/Api';
import { useForm } from 'react-hook-form';
import { LoginFormField, ProfileFormField } from 'types/auth';
import { AuthInfo } from 'types/auth';
import { useRouter } from 'next/router';
import AuthSubmitBtn from 'components/auth/authSubmitBtn';
import { useEffect, useState } from 'react';
import { JoinNickNameErrMsg, JoinProfileImgErrMsg } from '../joinErrMsg';

export default function ProfileForm() {
  const [disableBtn, setDisable] = useState(false);
  const [profileImg, setProfileImg] = useState(
    'https://d2pkj6jz1ow9ba.cloudfront.net/avatars/default',
  );
  const router = useRouter();
  const {
    register,
    getValues,
    handleSubmit,
    getFieldState,
    watch,
    setError,
    clearErrors,
    formState: { isDirty, dirtyFields, errors },
  } = useForm<ProfileFormField>({
    mode: 'onChange',
    defaultValues: {
      imageFile: undefined,
      nickName: '',
    },
  });

  const imageFile: Array<File> = watch('imageFile');

  useEffect(() => {
    console.log(router.query.avatarUrl);
    // 파일 타입이 image/* 가 아닌 경우 error
    if (imageFile?.length) {
      if (imageFile[0].type.search('image') < 0) {
        setError(`imageFile`, {
          type: `imageFile`,
        });
        setProfileImg('');
      } else {
        setProfileImg(URL.createObjectURL(imageFile[0]));
      }
    }
  }, [imageFile]);

  const handleError = (error: Error) => {
    setDisable(false);
    alert(error.message);
  };

  const checkFileType = (imageFile: File) => {
    if (!imageFile) {
      setProfileImg('https://d2pkj6jz1ow9ba.cloudfront.net/avatars/default');
      throw new Error('등록된 파일이 없습니다. 기본 이미지가 등록됩니다');
    } else if (imageFile.type.search('image') < 0) {
      setError(`imageFile`, {
        type: `imageFile`,
      });
      throw new Error('이미지 형식의 파일을 등록해주세요');
    }
  };

  const uploadS3 = async (imageFile: File) => {
    const EndPoint: string = await getPresignedUrl(); //presignedUrl 추출
    await uploadProfileImg(EndPoint, imageFile); //s3에 업로드

    return EndPoint.substring(0, EndPoint.indexOf('?')); //EndPoint에서 ? 앞 숫자들만 추출
  };

  const onValid = async (fieldValues: ProfileFormField) => {
    try {
      setDisable(true);
      checkFileType(fieldValues.imageFile[0]);
      const AvatarUrl = await uploadS3(fieldValues.imageFile[0]);
      console.log(AvatarUrl, fieldValues.nickName);
      await updateUserProfile(AvatarUrl, fieldValues.nickName);
      setDisable(false);
    } catch (error) {
      if (error instanceof Error) {
        handleError(error);
      }
    }
  };

  return (
    <div className="animate-profileAtter opacity-0 ">
      <form onSubmit={handleSubmit(onValid)}>
        <div className="flex flex-row flex-wrap w-[30rem] justify-center items-center">
          <img
            src={profileImg}
            alt="기본 프로필"
            className="w-[30rem] h-[25rem] my-2"
          />
          <input type="file" className="w-[30rem]" {...register('imageFile')} />
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
