export default function WelcomeQuestion({
  welcomeText,
}: {
  welcomeText: string;
}) {
  return (
    <div className="animate-intro relative bottom-[9rem] max-w-[50%] text-white text-5xl">
      {welcomeText}
    </div>
  );
}
