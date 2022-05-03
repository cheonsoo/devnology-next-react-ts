import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import withLayout from '@/components/layouts';

import { experiments } from '@/constants';

const Experiment: React.FC = () => {
  const [type, setType] = useState<string | boolean>('');
  const [path, setPath] = useState<string | boolean>('');

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const experiment = experiments[id];
      setType(experiment.type);
      setPath(experiment.path);
    }
  });

  function getIFrame() {
    if (type.toLowerCase() === 's3') {
      return <iframe width="100%" height="100%" src={path}></iframe>;
    } else if (type.toLowerCase() === 'local') {
      return <iframe width="100%" height="100%" src={path}></iframe>;
    } else if (type.toLowerCase() === 'component') {
      // TODO
    }
  }

  return <div style={{ width: '100%', height: '1000px' }}>{getIFrame()}</div>;
};

export default withLayout(Experiment);
