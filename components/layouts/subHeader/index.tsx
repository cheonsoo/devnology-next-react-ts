import React from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Layout.module.scss';

const menus = [
  { path: '/', label: 'devnology |' },
  { path: '/posts', label: 'posts |' },
  { path: '/experiments', label: 'experiments |' },
  { path: '/allmarkets', label: '장터검색 |' },
  { path: '/about', label: 'about' }
];

const SubHeader:React.FC = () => {
  const router = useRouter();

  const handleClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className={styles.subHeader}>
      <ul>
        {menus.map((item, idx) => (
          <li key={idx} onClick={() => handleClick(item.path)}>
            <div>{item.label}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubHeader;
