import React, { useEffect, useRef } from 'react';
import Image from "next/image";

import Image1 from './night-sky-g1f3262fbb_1920.jpg';
import Image2 from './church-g00bcdbd0a_1920.jpg';

import styles from '@/styles/Home.module.scss';

const Home: React.FC = () => {

  const imageRef1 = useRef<HTMLImageElement>(null);
  const imageRef2 = useRef<HTMLImageElement>(null);

  useEffect(() => {
    handleScrollImage();
  }, []);

  const handleScrollImage = () => {
    const offset = 1000;
    window.addEventListener("scroll", () => {
      const valueForHeader = window.pageYOffset / offset + 1;
      const valueForFooter = (3.5 - valueForHeader) > 1 ? 3.5 - valueForHeader : 1;

      if (imageRef1.current) {
        const img = imageRef1.current.querySelector('img');
        const line = imageRef1.current.querySelector('div');
        if (img) img.style.transform = `scale(${valueForHeader})`;
        if (line) line.style.transform = `scale(${valueForHeader})`;
      }

      if (imageRef2.current) {
        const img = imageRef2.current.querySelector('img');
        if (img) img.style.transform = `scale(${valueForFooter})`;
      }
    });
  };

  return (
    <div className={styles.home_container}>
      <div className='banner_img'ref={imageRef1}>
        <Image alt='test' layout='responsive' src={Image1} />
        <div className={styles.header_text}>DEVNOLOGY</div>
      </div>

      <div className='text'>얕은 지식 집합소</div>

      <div className='text'>그리고 이것 저것 시도해보는 실험실</div>

      <div className='text'>한번 둘러 보실래요?</div>

      <div className='banner_img' ref={imageRef2}>
        <Image alt='test' layout='responsive' src={Image2} />
      </div>
    </div>
  );
};

export default Home;
