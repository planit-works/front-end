import Link from 'next/link';

export default function AnswerLink({
  text,
  link,
}: {
  text: string;
  link: string;
}) {
  return (
    <Link href={link} legacyBehavior>
      <a className="animate-introAfter no-underline text-white text-4xl opacity-0">{text}</a>
    </Link>
  );
}
