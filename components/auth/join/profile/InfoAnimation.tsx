export default function WelcomeProfile() {
  return (
    <div
      className="absolute [&>*]:my-6 text-center items-center text-white text-5xl
    md:text-3xl"
    >
      <p className="animate-profile ">
        회원가입 마지막 단계입니다.
        <br /> 프로필을 설정해 주세요.
      </p>
      <p className="animate-profileSecond">
        지금 프로필을 설정하고 싶지 않으시다면
        <br />
        나중에 설정하셔도 좋습니다.
      </p>
    </div>
  );
}
