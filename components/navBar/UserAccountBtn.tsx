import { useState } from 'react';
import { UserMenuList } from './UserMenu';
import { LoginedUserInfo } from 'types/auth';

type UserAccountBtnProps = {
  userInfo: LoginedUserInfo;
};

export default function UserAccountBtn({ userInfo }: UserAccountBtnProps) {
  const [isOpenedUserMenu, setOpenUserMenu] = useState(false);

  const toggleOpenedUserMenu = () => {
    setOpenUserMenu((isOpenedUserMenu) => !isOpenedUserMenu);
  };

  return (
    <div className="flex [&>button]:mx-2">
      <button
        aria-pressed="false"
        className="flex flex-col justify-center items-center"
        onClick={toggleOpenedUserMenu}
      >
        <img
          alt=""
          src={
            process.env.NEXT_PUBLIC_IMG_THUMBNAIL + userInfo.profile.avatarUrl
          }
          className="w-10 h-10 rounded-[20%]"
        />
        <span className="text-xs">{userInfo.profile.nickname}</span>
      </button>
      {isOpenedUserMenu && <UserMenuList />}
    </div>
  );
}
