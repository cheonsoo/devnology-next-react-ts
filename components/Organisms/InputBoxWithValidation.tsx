import { useState } from 'react';
import styled from 'styled-components';

import { TInputValue, TInputChangeEvent, TInputMouseEvent, IProps } from '@/types';

import InputBox from '@/components/Monocules/InputBox';

const SDivValidation = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  color: red;
  padding: 10px;
`;

const InputBoxWithValidation: React.FC<IProps> = () => {
  const [inputValue, setInputValue] = useState<TInputValue>('');

  const handleChange = (evt: TInputChangeEvent) => {
    setInputValue(evt.target.value);
  };

  const handleEnter = (val: TInputValue) => {
    console.log('handleEnter', val);
    setInputValue(val);
  };

  const handleClick = (evt: TInputMouseEvent) => {
    console.log(evt);
  };

  return (
    <div>
      <InputBox value={inputValue} onChange={handleChange} onEnter={handleEnter} onClick={handleClick} />
      <SDivValidation>{inputValue}</SDivValidation>
    </div>
  );
};

export default InputBoxWithValidation;
