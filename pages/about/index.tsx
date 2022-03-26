import React from 'react';
import MarkdownContainer from '@/components/markdownContainer';
import content from '@/public/posts/about/about.md';

const About: React.FC = () => {
  return (<div><MarkdownContainer content={content} /></div>);
};

export default About;