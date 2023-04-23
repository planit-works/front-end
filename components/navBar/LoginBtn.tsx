import { useRouter } from 'next/router';

export default function LoginBtn() {
  const Router = useRouter();

  return (
    <div>
      <button onClick={() => Router.push('/login')}>LOGIN</button>
    </div>
  );
}
