import type { NextPage } from 'next'
import withLayout from '@/components/layouts';
import Home from '@/pages/home';

const Index: NextPage = () => {
  return (<Home />)
};

export default withLayout(Index);
