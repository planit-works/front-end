import AuthBtnTemplate from 'components/auth/authBtnTemplate';
import LoginForm from 'components/auth/login/loginForm';

export default function Login() {
  return (
    <div className="w-screen flex flex-col items-center justify-center relative h-screen overflow-x-hidden bg-[url('../assets/background2.jpg')] bg-cover bg-top bg-center bg-fixed">
      <LoginForm />
      <AuthBtnTemplate />
    </div>
  );
}
