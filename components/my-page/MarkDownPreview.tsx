import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import ReactMarkdown from 'react-markdown';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { useState } from 'react';

export default function MarkDownPreview({ textBio }: { textBio: string }) {
  const [isSummarized, setIsSummarized] = useState(
    'max-h-[7.5rem] overflow-hidden',
  );
  const MarkDownCssTailwind = `markdownCss text-white marker:text-white markdownCss-headings:text-white markdownCss-headings:my-[2px] markdownCss-ul:my-[1px] markdownCss-ol:my-[1px] markdownCss-li:my-[1px] markdownCss-h1:text-3xl md:text-sm ${isSummarized}`;

  const onSetSummary = () => {
    if (isSummarized) {
      setIsSummarized('');
    } else {
      setIsSummarized('max-h-[7.5rem] overflow-hidden');
    }
  };

  return (
    <div className="md:text-sm">
      <article className={MarkDownCssTailwind}>
        <ReactMarkdown
          children={textBio}
          remarkPlugins={[remarkGfm, remarkBreaks]}
        />
      </article>
      <button
        className={`float-right text-white mt-2 ${
          textBio ? 'visible' : 'invisible'
        }`}
        type="button"
        onClick={onSetSummary}
      >
        {isSummarized ? <AiFillCaretDown /> : <AiFillCaretUp />}
      </button>
    </div>
  );
}
