import { useRouter } from 'next/router';
import Link from 'next/link';

type OnlyLinkTemplateProps = {
  pathname: string;
  linkname: string;
};

export const CheckAccountPath = ({ pathname }: { pathname: string }) => {
  let logined = pathname === '/login' ? true : false;

  return (
    <div
      className="[&>span]:mr-3 my-3 text-lg
    md:text-base"
    >
      <span className="text-gray-400 ">
        {logined ? '아직 계정이 없으신가요?' : '이미 계정이 있으신가요?'}
      </span>
      <Link
        className="text-neutral-200 hover:text-blue-400 underline underline-offset-2"
        href={logined ? '/join' : '/login'}
      >
        {logined ? 'join us?' : 'login'}
      </Link>
    </div>
  );
};

export const OnlyLinkTemplate = ({
  pathname,
  linkname,
}: OnlyLinkTemplateProps) => {
  return (
    <div className="text-center">
      <div className="mt-16"></div>
      <div
        className="my-3 text-lg
   md:text-base"
      >
        <Link
          className="text-neutral-200 hover:text-blue-400 underline underline-offset-2"
          href={pathname}
        >
          {linkname}
        </Link>
      </div>
    </div>
  );
};

export default function AuthBtnTemplate() {
  const router = useRouter();

  return (
    <div className="text-center">
      <div className="mt-16"></div>
      <CheckAccountPath pathname={router.pathname} />

      <div
        className="my-3 text-lg
       md:text-base"
      >
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
