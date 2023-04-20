import SearchInput from 'components/search/SearchInput';
import LoginBtn from './LoginBtn';
import UserAccountBtn from './UserAccountBtn';
import { useGetLoginedUser } from 'react-query/useGetLoginedUser';

export default function UserNavBar() {
  // const { isErrorLogined } = useErrorStore();
  const { userInfo } = useGetLoginedUser();
  //localhost3000은 http. http에서 쿠키 요청하면 쿠키가 저장 안되는 증상
  //배포 후 테스트

  return (
    <div className="absolute top-[1rem] flex w-full justify-between">
      <SearchInput />
      {userInfo ? <UserAccountBtn userInfo={userInfo} /> : <LoginBtn />}
    </div>
  );
}
