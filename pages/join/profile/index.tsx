import ProfileForm from 'components/auth/join/profile/profileForm';
import ProfileImg from 'components/auth/join/profile/profileImg';
import { ChevronRightButton } from 'components/ChevronButton';
import { useRouter } from 'next/router';

export default function Profile() {
  const router = useRouter();

  return (
    <div className="w-screen flex flex-col items-center justify-center relative h-screen overflow-x-hidden bg-[url('../assets/background2.jpg')] bg-cover bg-top bg-center bg-fixed">
      <p className="animate-profile absolute text-white text-4xl">
        회원가입 마지막 단계입니다. 프로필을 설정해 주세요.
      </p>
      <ProfileForm />
      <ChevronRightButton
        classList="right-2"
        handleButtonClick={() => {
          router.push('/');
        }}
      />
    </div>
  );
}
