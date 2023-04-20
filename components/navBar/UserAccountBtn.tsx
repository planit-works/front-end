import { useState } from 'react';
import UserMenuList from './UserMenu';
import { LoginedUserInfo } from 'types/auth';
import ImageFilled from './../ImageFilled';

type UserAccountBtnProps = {
  userInfo: LoginedUserInfo;
};

export default function UserAccountBtn({ userInfo }: UserAccountBtnProps) {
  const [isOpenedUserMenu, setOpenUserMenu] = useState(false);

  const toggleOpenedUserMenu = () => {
    setOpenUserMenu((isOpenedUserMenu) => !isOpenedUserMenu);
  };

  return (
    <div className="flex flex-col justify-center items-center [&>button]:mx-2">
      <button
        aria-pressed="false"
        className="flex flex-col justify-center items-center"
        onClick={toggleOpenedUserMenu}
      >
        <ImageFilled
          containerClass={'relative w-10 h-10'}
          imageClass={'rounded-[20%]'}
          src={
            process.env.NEXT_PUBLIC_IMG_THUMBNAIL + userInfo.profile.avatarUrl
          }
          alt={'로그인 유저 프로필'}
        />
        <span className="text-sm text-gray-200">
          {userInfo.profile.nickname}
        </span>
      </button>
      {isOpenedUserMenu && <UserMenuList />}
    </div>
  );
}
