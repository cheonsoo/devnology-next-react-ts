import React from 'react';
import MarkdownContainer from '@/components/markdownContainer';
import content from '@/public/posts/about/about.md';
import withLayout from '@/components/layouts';

import styles from '@/styles/About.module.scss';

const About: React.FC = () => {
  return (
    <div className={styles.about_container}>
      <MarkdownContainer content={content} />
    </div>
  );
};

export default withLayout(About);
