import React from 'react';
import styled from 'styled-components';

const StyledH1 = styled.div`
  padding-left: 10px;
  font-weight: 900;
  font-size: 36px;
  border-bottom: 5px solid gray;
`;

export default function MarkdownH1(props: any) {
  return <StyledH1>{props.children[0]}</StyledH1>;
}
