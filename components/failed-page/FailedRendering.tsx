export default function FailedRendering() {
  const pageText =
    '페이지 로드에 실패하였습니다. \n 다시 한 번 시도해 주십시오.';

  return (
    <div
      className="whitespace-pre-line font-semibold text-white text-center text-3xl 
    md:text-2xl"
    >
      <span>{pageText}</span>
    </div>
  );
}
