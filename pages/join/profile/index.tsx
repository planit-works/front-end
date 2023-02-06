import ProfileImg from 'components/auth/join/profile/profileImg';
import ProfileName from 'components/auth/join/profile/profileName';

export default function Profile() {
  return (
    <div className="w-screen flex flex-col items-center justify-center relative h-screen overflow-x-hidden bg-[url('../assets/background2.jpg')] bg-cover bg-top bg-center bg-fixed">
      <ProfileImg />
    </div>
  );
}
