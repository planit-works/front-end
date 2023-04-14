import useErrorStore from 'store/useErrorStore';
import LoginBtn from './LoginBtn';
import UserAccountBtn from './UserAccountBtn';
import { useGetLoginedUser } from 'react-query/useGetLoginedUser';

export default function UserNavBar() {
  // const { isErrorLogined } = useErrorStore();
  const { userInfo } = useGetLoginedUser();

  return (
    <div className="absolute [&>button]:mx-4 top-[2%] right-[4%] text-gray-200">
      {userInfo ? <UserAccountBtn userInfo={userInfo} /> : <LoginBtn />}
    </div>
  );
}
