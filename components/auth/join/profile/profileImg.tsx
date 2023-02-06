import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProfileName from 'components/auth/join/profile/profileName';

export default function ProfileImg() {
  const router = useRouter();
  const [profileImg, setProfileImg] = useState('');

  useEffect(() => {
    console.log(router.query.avatarUrl);
    setProfileImg('https://d2pkj6jz1ow9ba.cloudfront.net/avatars/default');
  }, [router.query.avatarUrl]);

  return (
    <div>
      <img
        src={profileImg}
        alt="기본 프로필"
        className="w-60 h-60 animate-intro"
      />
      <input type="file" className="animate-intro" />
      <ProfileName />
    </div>
  );
}
