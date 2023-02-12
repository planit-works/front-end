export default function WelcomeProfile() {
  return (
    <div className="absolute [&>*]:my-6">
      <p className="animate-profile text-center items-center text-white text-5xl">
        회원가입 마지막 단계입니다.
        <br /> 프로필을 설정해 주세요.
      </p>
      <p className="animate-profileSecond text-center text-white text-5xl">
        지금 프로필을 설정하고 싶지 않으시다면
        <br />
        나중에 설정하셔도 좋습니다.
      </p>
    </div>
  );
}
