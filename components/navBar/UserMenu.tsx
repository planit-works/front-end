import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import { logoutUser } from 'api/auth/Api';
import useErrorStore from 'store/useErrorStore';
import QueryKey from '../../react-query/react-key/index';

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
    <li>
      <button onClick={() => Router.push(link)}>{name}</button>
    </li>
  );
};

export const UserMenuBtn = ({ name, execution }: UserMenuBtnProps) => {
  return (
    <li>
      <button onClick={execution}>{name}</button>
    </li>
  );
};

export const UserMenuList = () => {
  const queryClient = useQueryClient();
  const Router = useRouter();
  const { setErrorLogined } = useErrorStore();
  const onLogOut = async () => {
    try {
      await logoutUser();
      queryClient.removeQueries([QueryKey.getLoginedUser]);
      queryClient.removeQueries([QueryKey.getMyProfile]);
      Router.replace('/welcome');
      setErrorLogined(true);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <ul>
      <UserMenuLinked name="My Page" link="/my-page" />
      <UserMenuBtn name="LogOut" execution={onLogOut} />
    </ul>
  );
};
