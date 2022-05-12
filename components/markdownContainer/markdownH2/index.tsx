import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.div`
  border-left: 5px solid green;
  padding-left: 10px;
  font-weight: 900;
  font-size: 24px;
`;

const StyledTitleContainer = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  margin-top: 50px;
  margin-bottom: 20px;
`;

const StyledTitleMark = styled.div`
  width: 15px;
  height: 100%;
  border-radius: 5px;
  background-color: orange;
  margin-right: 10px;
`;

const StyledTitleText = styled.div`
  font-weight: 900;
  font-size: 24px;
`;

export default function MarkdownH2(props: any) {
  return (
    <StyledTitleContainer>
      <StyledTitleMark />
      <StyledTitleText>{props.children}</StyledTitleText>
    </StyledTitleContainer>
  );
}

// export default function MarkdownH2(props: any) {
//   return <StyledTitle>{props.children}</StyledTitle>;
// }
