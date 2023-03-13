import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import ReactMarkdown from 'react-markdown';

export default function MarkDownPreview({ child }: { child: string }) {
  return (
    <div className="text-white">
      <ReactMarkdown
        children={child}
        remarkPlugins={[remarkGfm, remarkBreaks]}
      />
    </div>
  );
}
