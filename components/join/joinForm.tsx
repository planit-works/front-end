import { AuthInputText, AuthInputPsw } from '../authInput';

export default function JoinForm() {
  return (
    <div className=" flex flex-col items-center justify-center w-1/2 relative bottom-[4rem] ">
      JOIN
      <form action="">
        <AuthInputText placeHolder="Email을 입력해 주세요" />
        <AuthInputPsw placeHolder="Password를 입력해 주세요" />
        <AuthInputPsw placeHolder="Password를 다시 한 번 입력해 주세요" />
        <button type="submit">회원가입</button>
        <button type="button">비회원</button>
      </form>
    </div>
  );
}
