import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight';

interface MarkdownProps {
  source: string;
}

const MarkdownRenderer: React.FC<MarkdownProps> = ({ source }) => {
  return (
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>{source}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
