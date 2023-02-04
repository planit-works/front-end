import AuthBtnTemplate from 'components/auth/authBtnTemplate';
import {
  ChevronLeftButton,
  ChevronRightButton,
} from 'components/ChevronButton';
import JoinForm from 'components/auth/join/joinForm';

export default function Join() {
  return (
    <div className="w-screen flex flex-col items-center justify-center relative h-screen overflow-x-hidden bg-[url('../assets/background2.jpg')] bg-cover bg-top bg-center bg-fixed">
      <JoinForm />
      <AuthBtnTemplate />
    </div>
  );
}
