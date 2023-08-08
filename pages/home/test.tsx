import { useState } from 'react';
// import Input from '@/components/Atoms/Input';
// import InputBox from '@/components/Monocules/InputBox';
import InputBoxWithValidation from '@/components/Organisms/InputBoxWithValidation';

import { TInputValue, TInputChangeEvent } from '@/types';

const Test: React.FC = () => {
  const [username, setUsername] = useState<TInputValue>('');

  const handleChange = (evt: TInputChangeEvent) => {
    setUsername(evt.target.value);
  };

  const handleEnter = (val: TInputValue) => {
    console.log('handleEnter', val);
    setUsername(val);
  };

  return (
    <div>
      <InputBoxWithValidation value={username} onChange={handleChange} onEnter={handleEnter} />
      {/* <InputBox value={username} onChange={handleChange} onEnter={handleEnter} /> */}
    </div>
  );
};

export default Test;
