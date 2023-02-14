import { useRouter } from 'next/router';
import { ChevronLeftButton, ChevronRightButton } from '../ChevronButton';

export default function AuthBtnTemplate() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  return (
    <>
      <ChevronRightButton
        classList="right-2"
        handleButtonClick={() => {
          router.pathname === '/login'
            ? router.push('/join')
            : router.push('/login');
        }}
      />
      <ChevronLeftButton
        classList="left-2"
        handleButtonClick={() => {
          router.push('/welcome');
        }}
      />
    </>
  );
}
