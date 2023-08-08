import styled from 'styled-components';
import { IProps, TInputMouseEvent } from '@/types';

const SButton = styled.button`
  width: 80px;
  height: 30px;
  text-transform: uppercase;
  font-weight: 900;
  background-color: #fff;
  border: 1px solid gray;
  border-radius: 4px;
  margin-left: 10px;
`;

const Button: React.FC<IProps> = ({ label = 'click', onClick }) => {
  const handleClick = (evt: TInputMouseEvent) => {
    onClick && onClick(evt);
  };

  return <SButton onClick={handleClick}>{label}</SButton>;
};

export default Button;
