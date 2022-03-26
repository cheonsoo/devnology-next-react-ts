import React from 'react';
import ScrollMeter from 'scrollmeter';

import Header from './header';
import SubHeader from './subHeader';
import Footer from './footer';

import styles from '@/styles/Layout.module.scss';

const withLayout = Page => {
  return function Layout() {
    return (
      <div className={styles.main_container}>
        <Header />
        <SubHeader />
        <ScrollMeter height={10} top={50} duration={10} />

        <div className='contents_container'>
          <Page />
        </div>

        <Footer />
      </div>
    );
  }
};

export default withLayout;
