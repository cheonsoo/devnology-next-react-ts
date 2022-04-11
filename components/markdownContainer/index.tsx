import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import MarkDownImage from './markdownImage';
import MarkDownCodeBlock from './markdownCodeBlock';
import MarkDownH1 from './markdownH1';
import MarkDownH2 from './markdownH2';
import MarkDownBlockQuote from './markdownBlockQuote';
import NoPost from './noPost';
interface IPost {
  content: string;
}

const MarkdownContainer: React.FC<IPost> = ({ content = '' }) => {
  return (
    <>
      <div>
        {content ? (
          <ReactMarkdown
            components={{
              code: MarkDownCodeBlock,
              img: MarkDownImage,
              h1: MarkDownH1,
              h2: MarkDownH2,
              blockquote: MarkDownBlockQuote,
              table: ({ node, ...props }) => <table className="markdown-table" {...props}></table>,
              // blockquote: ({ node, ...props }) => <div style={{ color: 'red' }} {...props}></div>,
              // h2: ({ node, ...props }) => <div style={{ color: 'red' }} {...props}></div>,
            }}
            remarkPlugins={[remarkGfm]}
          >
            {content}
          </ReactMarkdown>
        ) : (
          <NoPost />
        )}
      </div>
    </>
  );
};

export default MarkdownContainer;
