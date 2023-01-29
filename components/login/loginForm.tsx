import { AuthInputText, AuthInputPsw } from '../authInput';

export default function LoginForm() {
  return (
    <div className=" flex flex-col items-center justify-center w-1/2 relative bottom-[4rem] ">
      LOGIN
      <form action="">
        <AuthInputText placeHolder="Email을 입력해 주세요" />
        <AuthInputPsw placeHolder="Password를 입력해 주세요" />
        <button type="submit">로그인</button>
        <button type="button">비회원</button>
      </form>
    </div>
  );
}
