import React from 'react';
import styled from 'styled-components';

const StyledBlockQuoteContainer = styled.div`
  margin: 15px 15px;
`;

const StyledBlockQuote = styled.blockquote`
  border-left: 5px solid green;
  padding: 0 20px;
  font-weight: 900;
  font-size: 24px;
  background-color: #eeeeee;
  padding-top: 8px;
  margin: 0;

  & p {
    margin: 0;
  }
`;

export default function MarkdownBlockQuote({ node, ...props }) {
  return (
    <StyledBlockQuoteContainer>
      <StyledBlockQuote>{props.children}</StyledBlockQuote>
    </StyledBlockQuoteContainer>
  );
}
