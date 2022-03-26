import React from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import MarkDownImage from './markdownImage';
import MarkDownCodeBlock from './markdownCodeBlock';
import NoPost from './noPost';
interface IPost {
  content: string
};

const MarkdownContainer: React.FC<IPost> = ({ content = '' }) => {
  return (<>
    <div>
      { content ? (
      <ReactMarkdown
        components={{
          code: MarkDownCodeBlock,
          img: MarkDownImage
        }}
        remarkPlugins={[remarkGfm]}
      >{content}</ReactMarkdown>) : (<NoPost />)}
    </div>
  </>);
};

export default MarkdownContainer;
