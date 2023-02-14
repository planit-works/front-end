import WelcomeProfile from 'components/auth/join/profile/InfoAnimation';
import ProfileForm from 'components/auth/join/profile/profileForm';
import { ChevronRightButton } from 'components/ChevronButton';
import { useRouter } from 'next/router';

export default function Profile() {
  const router = useRouter();

  return (
    <div className="w-screen flex flex-col items-center justify-center relative h-screen overflow-x-hidden bg-[url('../assets/background2.jpg')] bg-cover bg-top bg-center bg-fixed">
      <WelcomeProfile />
      <ProfileForm />
      <ChevronRightButton
        classList="right-2 animate-profileAtter opacity-0"
        handleButtonClick={() => {
          router.push('/');
        }}
      />
    </div>
  );
}
