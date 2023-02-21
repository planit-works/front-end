import { logoutUser } from 'api/auth/Api';
import { useRouter } from 'next/router';
import { useGetLoginedUser } from 'react-query/useGetLoginedUser';
import useErrorStore from 'store/useErrorStore';
import { useQueryClient } from '@tanstack/react-query';
import QueryKey from './../react-query/key/index';

export default function UserNavBar() {
  const { isError, setError } = useErrorStore();
  const Router = useRouter();

  const { userInfo, userId } = useGetLoginedUser();
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
          <button
            className="flex flex-col justify-center items-center"
            onClick={() =>
              Router.push(
                // {
                //   pathname: '/my-page/[id]',
                //   query: { id: userId },
                // }, //다이나믹 라우팅 대비
                '/my-page',
              )
            }
          >
            <img
              alt=""
              src={
                (process.env.NEXT_PUBLIC_IMG_THUMBNAIL as string) +
                userInfo?.profile.avatarUrl
              }
              className="w-10 h-10 rounded-[20%]"
            />
            <span className="text-xs">{userInfo?.profile.nickname}</span>
          </button>

          <button onClick={onLogOut}>LOGOUT</button>
        </div>
      )}
    </div>
  );
}
