import { getPresignedUrl, uploadProfileImg } from 'api/aws/Api';
import { useForm } from 'react-hook-form';
import { ProfileFormField } from 'types/auth';
import { useEffect, useState } from 'react';
import { NickNameErrMsg, ProfileImgErrMsg } from '../../FormErrMsg';
import {
  InputImgFile,
  InputNickName,
} from 'components/auth/join/profile/InputProfile';
import { useUpdateProfile } from '../../../../react-query/profile/useUpdateProfile';
import SliderUpdateChecker from 'components/SliderUpdateChecker';
import useProfileImg from 'hooks/useProfileImg';
import AuthSubmitBtn from 'components/auth/AuthSubmitBtn';
import { getSerialNumFromUrl } from 'utils/getSerialNumFromUrl';
import { useGetLoginedUser } from 'react-query/useGetLoginedUser';
import ImageFilled from './../../../ImageFilled';
import { OnlyLinkTemplate } from 'components/auth/AuthBtnTemplate';

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
  const mutateUserProfile = useUpdateProfile();
  const { userInfo } = useGetLoginedUser();

  const { profileImg } = useProfileImg(imageFile, userInfo?.profile.avatarUrl);

  useEffect(() => {
    //profileImg가 이미지 형식 파일이 아니면 Error 발생
    if (!profileImg) {
      setError(`imageFile`, {
        type: `imageFile`,
      });
    }
  }, [profileImg]);

  const handleError = (error: Error) => {
    setDisable(false);
    alert(error.message);
  };

  const updateProfileWithImg = async (imageFile: File[], nickname: string) => {
    const EndPoint: string = await getPresignedUrl();
    await uploadProfileImg(EndPoint, imageFile[0]);
    const AvatarUrl = 'avatars/' + getSerialNumFromUrl(EndPoint);
    mutateUserProfile.mutate({
      nicknameData: nickname,
      avatarUrlData: AvatarUrl,
    });
  };

  const updateProfileWithOutImg = async (nickname: string) => {
    //아무 파일도 없는 경우 닉네임만 업데이트
    mutateUserProfile.mutate({
      nicknameData: nickname,
      avatarUrlData: userInfo?.profile.avatarUrl,
    });
  };

  const checkImgFileType = (imageFile: File[]) => {
    if (!imageFile[0].type.includes('image')) {
      setError(`imageFile`, {
        type: `imageFile`,
      });
      throw Error('이미지 형식의 파일만 등록할 수 있습니다');
    }
  };

  const onValid = async ({ imageFile, nickname }: ProfileFormField) => {
    //이미지 파일이 등록된 경우&파일은 있으나 이미지 파일이 아닌 경우&파일이 등록되지 않은 경우
    try {
      if (imageFile && imageFile.length) {
        checkImgFileType(imageFile);
        await updateProfileWithImg(imageFile, nickname);
      } else {
        await updateProfileWithOutImg(nickname);
      }
    } catch (error) {
      if (error instanceof Error) {
        handleError(error);
      }
    }
  };

  return (
    <div className="animate-profileAtter opacity-0 flex items-center justify-center flex-col">
      <form onSubmit={handleSubmit(onValid)}>
        <div className="">
          <ImageFilled
            containerClass={
              'relative w-[30rem] h-[25rem] my-2 md:w-[20rem] md:h-[15rem]'
            }
            imageClass={'rounded-[8%]'}
            src={profileImg}
            alt={'기본 프로필'}
          />
          <InputImgFile control={control} />
        </div>
        <ProfileImgErrMsg
          error={errors}
          checkDirty={getFieldState('imageFile').isDirty}
        />
        <InputNickName
          defaultValue={userInfo?.profile.nickname}
          control={control}
        />
        <NickNameErrMsg
          error={errors}
          checkDirty={getFieldState('nickname').isDirty}
        />
        <AuthSubmitBtn btnName="Submit" disable={disableBtn} />
      </form>
      <OnlyLinkTemplate pathname={'/'} linkname={'나중에 편집할게요!'} />
      <SliderUpdateChecker />
    </div>
  );
}
