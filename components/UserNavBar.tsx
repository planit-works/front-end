import { logoutUser, verifyLogin } from 'api/auth/Api';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useGetLoginedUser } from 'api/auth/useGetLoginedUser';

export default function UserNavBar() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const Router = useRouter();

  // const checkLogin = async () => {
  //   try {
  //     await verifyLogin();
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       setIsLogin(false);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   checkLogin();
  // }, []);

  const { profile, isError } = useGetLoginedUser();
  console.log(isError);
  if (isError) {
    return (
      <div className="absolute [&>button]:mx-4 top-[2%] right-[4%] text-gray-200">
        <button onClick={() => Router.push('/login')}>LOGIN</button>
      </div>
    );
  }

  console.log('asd', profile);

  const onLogOut = async () => {
    try {
      await logoutUser();
      Router.replace('/welcome');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="absolute [&>button]:mx-4 top-[2%] right-[4%] text-gray-200">
      <button onClick={onLogOut}>LOGOUT</button>

      <button onClick={() => Router.push('/my-page')}>MYPAGE</button>
    </div>
  );
}
