import { logoutUser, verifyLogin } from 'api/auth/Api';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useGetLoginedUser } from 'react-query/useGetLoginedUser';
import useErrorStore from 'store/useErrorStore';
import { useQueryClient } from '@tanstack/react-query';
import QueryKey from './../react-query/key/index';
import { Profile } from 'types/auth';

export default function UserNavBar() {
  const { isError, setError } = useErrorStore();
  const Router = useRouter();

  const { profile, refetch } = useGetLoginedUser();

  const queryClient = useQueryClient();
  const onLogOut = async () => {
    try {
      await logoutUser();
      queryClient.removeQueries([QueryKey.getLoginedUser]);
      Router.replace('/welcome');
      setError(true);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="absolute [&>button]:mx-4 top-[2%] right-[4%] text-gray-200">
      {isError ? (
        <div>
          <button onClick={() => Router.push('/login')}>LOGIN</button>
        </div>
      ) : (
        <div className="flex [&>button]:mx-2">
          <button onClick={() => Router.push('/my-page')}>
            <img
              alt=""
              src={profile?.avatarUrl}
              className="w-10 h-10 rounded-[20%]"
            />
            <span>{profile?.nickname}</span>
          </button>

          <button onClick={onLogOut}>LOGOUT</button>
        </div>
      )}
    </div>
  );
}
