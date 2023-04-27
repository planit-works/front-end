import { useRouter } from 'next/router';

export default function LoginBtn() {
  const Router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center [&>button]:mx-2 text-white">
      <button onClick={() => Router.push('/login')}>LOGIN</button>
    </div>
  );
}
