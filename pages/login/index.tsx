import LoginForm from 'components/auth/login/LoginForm';

export default function Login() {
  return (
    <div className="w-screen flex flex-col items-center justify-center relative h-screen overflow-x-hidden bg-[url('../assets/background2.webp')] bg-cover bg-top bg-center bg-fixed">
      <LoginForm />
    </div>
  );
}
