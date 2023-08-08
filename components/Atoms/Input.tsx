import { useState } from 'react';
import styled from 'styled-components';
import { TInputValue, TInputChangeEvent, TInputKeyboardEvent, IProps } from '@/types';

const SInput = styled.input`
  height: 30px;
`;

const Input: React.FC<IProps> = ({ value = '', onChange, onEnter }) => {
  const [inputValue, setInputValue] = useState<TInputValue>(value);

  const handleChange = (evt: TInputChangeEvent) => {
    setInputValue(evt.target.value);
    onChange && onChange(evt);
  };

  const handleEnter = (evt: TInputKeyboardEvent) => {
    if (evt.key === 'Enter') {
      onEnter && onEnter(inputValue);
    }
  };

  return <SInput type="text" value={inputValue} onKeyUp={handleEnter} onChange={handleChange} />;
};

export default Input;
