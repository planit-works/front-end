import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import { logoutUser } from 'api/auth/Api';
import useErrorStore from 'store/useErrorStore';
import QueryKey from '../../react-query/react-key/index';
import { useCallback } from 'react';

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

const UserMenuList = () => {
  const queryClient = useQueryClient();
  const Router = useRouter();
  const { setErrorLogined } = useErrorStore();
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
        alert(error.message);
      }
    }
  }, []);

  return (
    <ul className={`absolute top-[3.8rem] text-xs text-black my-0.5 `}>
      <UserMenuLinked name="My Page" link="/my-page" />
      <UserMenuBtn name="Log Out" execution={onLogOut} />
    </ul>
  );
};

export default UserMenuList;
