import Link from 'next/link';

export default function AnswerLink({
  text,
  link,
}: {
  text: string;
  link: string;
}) {
  return (
    <Link
      href={link}
      className="relative animate-introAfter no-underline text-white text-4xl opacity-0
    md:text-3xl md:my-3"
    >
      {text}
    </Link>
  );
}
