import { useRouter } from 'next/router';
import Link from 'next/link';

export default function AuthBtnTemplate() {
  const router = useRouter();

  return (
    <div className="text-center">
      <div className="mt-16"></div>
      {router.pathname === '/login' ? (
        <div className="[&>span]:mr-3 my-3">
          <span className="text-gray-400">아직 계정이 없으신가요?</span>
          <Link
            className="text-neutral-200 hover:text-blue-400 underline underline-offset-2"
            href={'/join'}
          >
            join us
          </Link>
        </div>
      ) : (
        <div className="[&>span]:mr-3 my-3">
          <span className="text-gray-400">이미 계정이 있으신가요?</span>
          <Link
            className="text-neutral-200 hover:text-blue-400 underline underline-offset-2"
            href={'/login'}
          >
            login
          </Link>
        </div>
      )}

      <div className="my-3">
        <Link
          className="text-neutral-200 hover:text-blue-400 underline underline-offset-2"
          href={'/'}
        >
          계정이 없어도 이용할 수 있습니다!
        </Link>
      </div>
    </div>
  );
}
