import React from 'react';
import styled from 'styled-components';

const StyledInlineCodeBlock = styled.div`
  background: #e9e9e9;
  padding: 20px;
  border-radius: 8px;
  overflow: auto;
  max-height: 300px;
  color: #e0622c;
  font-weight: 900;
`;

export default function StyledInlineCode(props: any) {
  return <StyledInlineCodeBlock>{props.children[0]}</StyledInlineCodeBlock>;
}
