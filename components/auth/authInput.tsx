import { mkdir } from 'fs';

export function AuthInputText({ placeHolder }: { placeHolder: string }) {
  return (
    <input
      type="text"
      className="animate-intro block bg-transparent w-[30rem] h-12 my-14 border-solid border-b-[1px] border-b-white focus:outline-none focus:border-sky-500 text-white text-2xl"
      placeholder={placeHolder}
    />
  );
}

export function AuthInputPsw({ placeHolder }: { placeHolder: string }) {
  return (
    <input
      type="password"
      className="animate-intro block bg-transparent w-[30rem] h-12 my-14 border-solid border-b-[1px] border-b-white focus:outline-none focus:border-sky-500 text-white text-2xl"
      placeholder={placeHolder}
    />
  );
}
