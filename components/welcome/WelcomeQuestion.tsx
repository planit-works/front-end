export default function WelcomeQuestion({
  welcomeText,
}: {
  welcomeText: string;
}) {
  return (
    <div
      className="animate-intro text-center flex mb-40 text-white text-5xl
    md:text-4xl"
    >
      {welcomeText}
    </div>
  );
}
