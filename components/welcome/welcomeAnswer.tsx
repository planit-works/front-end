import AnswerLink from "./answerLink";

export default function WelcomeAnswer() {
  return (
    <div className="flex justify-around min-w-[50%] max-w-[50%]">
      <AnswerLink text="예" link="/login" /> <AnswerLink text="아니요" link="/join" />
    </div>
  );
}
