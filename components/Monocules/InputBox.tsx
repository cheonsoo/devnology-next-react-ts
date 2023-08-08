import styled from 'styled-components';

import Input from '@/components/Atoms/Input';
import Button from '@/components/Atoms/Button';

import { IProps } from '@/types';

const SInputBox = styled.div`
  padding: 10px;
`;

const InputBox: React.FC<IProps> = ({ value = '', onChange, onEnter, onClick }) => {
  return (
    <SInputBox>
      <Input value={value} onChange={onChange} onEnter={onEnter} />
      <Button onClick={onClick} />
    </SInputBox>
  );
};

export default InputBox;
