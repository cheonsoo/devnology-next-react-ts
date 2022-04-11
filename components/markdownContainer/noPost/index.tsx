import React from 'react';
import styled from 'styled-components';

const MarkdownInnerDiv = styled.div`
  width: 900px;
`;

const NoMarkdownContentDiv = styled.div`
  width: 900px;
  height: 500px;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  font-weight: 900;
  font-size: 30px;
`;

function NoPost(props: any) {
  return <NoMarkdownContentDiv>{props.content || 'No Post Yet'}</NoMarkdownContentDiv>;
}

export default NoPost;
