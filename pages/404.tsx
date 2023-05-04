import Link from 'next/link';
import { TbError404 } from 'react-icons/tb';

export default function Custom404() {
  const ErrTextContent =
    '페이지가 존재하지 않거나 사용할 수 없는 페이지입니다. \n 입력하신 주소를 다시 한 번 확인해 주시기 바랍니다. ';
  const ErrBtnContent = '처음 화면으로 돌아가기';

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center text-center">
      <div className="mb-44">
        <h1 className="flex flex-col items-center justify-center">
          <TbError404
            className="text-9xl
          md:text-8xl"
          />
          <span
            className="font-bold text-3xl
          md:text-2xl"
          >
            (Not Found)
          </span>
        </h1>
        <div className="mt-16"></div>
        <div
          className="whitespace-pre-line
        md:text-sm"
        >
          {ErrTextContent}
        </div>
        <div className="mt-8"></div>
        <Link href={'/welcome'} className="flex justify-center">
          <div
            className="w-44 h-10 bg-blue-500 text-white flex items-center justify-center
          md:w-36 md:text-sm"
          >
            {ErrBtnContent}
          </div>
        </Link>
      </div>
    </div>
  );
}
