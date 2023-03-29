import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import ReactMarkdown from 'react-markdown';

const MarkDownCssTailwind =
  'markdownCss text-white marker:text-white markdownCss-headings:text-white markdownCss-headings:my-[2px] markdownCss-ul:my-[1px] markdownCss-ol:my-[1px] markdownCss-li:my-[1px] markdownCss-h1:text-3xl';

export default function MarkDownPreview({ child }: { child: string }) {
  return (
    <div className="">
      <article className={MarkDownCssTailwind}>
        <ReactMarkdown
          children={child}
          remarkPlugins={[remarkGfm, remarkBreaks]}
        />
      </article>
    </div>
  );
}
