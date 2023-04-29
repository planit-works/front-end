import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import { logoutUser } from 'api/auth/Api';
import { useCallback } from 'react';

// import useErrorStore from 'store/useErrorStore';
type UserMenuLinkedProps = {
  name: string;
  link: string;
};

type UserMenuBtnProps = {
  name: string;
  execution: () => void;
};

export const UserMenuLinked = ({ name, link }: UserMenuLinkedProps) => {
  const Router = useRouter();

  return (
    <li className="text-center font-medium bg-white my-0.5 p-0.5 rounded-md border hover:bg-slate-200 hover:border-slate-200">
      <button onClick={() => Router.push(link)}>{name}</button>
    </li>
  );
};

export const UserMenuBtn = ({ name, execution }: UserMenuBtnProps) => {
  return (
    <li className="text-center font-medium bg-white my-0.5 p-0.5 rounded-md border hover:bg-slate-200 hover:border-slate-200">
      <button onClick={execution}>{name}</button>
    </li>
  );
};

export const UserMenuList = () => {
  const queryClient = useQueryClient();
  const Router = useRouter();
  // const { setErrorLogined } = useErrorStore();
  const onLogOut = useCallback(async () => {
    try {
      // queryClient.removeQueries([QueryKey.getLoginedUser]);
      // queryClient.removeQueries([QueryKey.getMyProfile]);
      queryClient.clear();

      Router.replace('/welcome');
      // setErrorLogined(true);
      await logoutUser();
    } catch (error) {
      if (error instanceof Error) {
        alert('로그아웃에 실패하였습니다. 잠시 후 다시 시도해 주십시오');
      }
    }
  }, []);

  return (
    <ul
      className={`absolute top-[4.2rem] text-xs text-black my-0.5 
    md:top-[3.8rem]`}
    >
      <UserMenuLinked name="My Page" link="/my-page" />
      <UserMenuBtn name="Log Out" execution={onLogOut} />
    </ul>
  );
};
