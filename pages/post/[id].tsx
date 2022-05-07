import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MarkdownContainer from '@/components/markdownContainer'

import withLayout from '@/components/layouts';

import styles from '@/styles/Posts.module.scss';
import { posts } from '@/constants';

const Post: React.FC = () => {
  const [content, setContent] = useState('');

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      console.log(`### post id: ${id}`);
      // const post = posts[id];
      const markdown = require(`@/public/posts/${id}/${id}.md`);
      setContent(markdown.default);
    }
  }, [id]);

  return (
    <div className={styles.post_container}>
      <MarkdownContainer content={content} />
    </div>
  );
};

export default withLayout(Post);
