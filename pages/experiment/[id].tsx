import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import VisualizedArrayCompare from '@/components/visualizedArrayCompare';

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
  }, []);

  function getComponent() {
    const comp = VisualizedArrayCompare;
    return React.createElement(comp, {});
  };

  return (
    <div style={{ width: '100%', height: '1000px' }}>
      {type === 'component' ?
        (<>{getComponent()}</>) :
        <iframe width="100%" height="100%" src={`/experiments/${id}/index.html`}></iframe>
      }
    </div>
  );
};

export default withLayout(Experiment);
