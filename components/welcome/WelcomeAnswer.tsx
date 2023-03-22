import AnswerLink from './AnswerLink';

export default function WelcomeAnswer() {
  return (
    <div className="flex flex-wrap justify-around min-w-[50%] max-w-[50%]">
      <AnswerLink text="예, 로그인 할게요" link="/login" />{' '}
      <AnswerLink text="아니요, 그냥 볼게요" link="/" />
    </div>
  );
}
