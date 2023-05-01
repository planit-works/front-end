import WelcomeProfile from 'components/auth/join/profile/InfoAnimation';
import ProfileForm from 'components/auth/join/profile/ProfileForm';
export default function Profile() {
  return (
    <div className="w-screen flex flex-col items-center justify-center relative h-screen overflow-x-hidden bg-[url('../assets/background2.webp')] bg-cover bg-top bg-center bg-fixed">
      <WelcomeProfile />
      <ProfileForm />
    </div>
  );
}
