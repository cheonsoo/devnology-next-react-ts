import React from 'react';
import styled from 'styled-components';

interface IStyledImage {
  width?: String;
  height?: String;
};

const StyledImage = styled.img<IStyledImage>`
  width: 100%;

  ${props => props.width && `
    width: ${props.width};
  `}
  ${props => props.height && `
    height: ${props.height};
  `}
`;

export default function MarkdownImage(props: any) {
  const altProps = props.alt;
  const alts = altProps.split(';');

  let alt = alts.find((a: String) => a.toLowerCase().startsWith('alt'));
  let width = alts.find((a: String) => a.toLowerCase().startsWith('width'));
  let height = alts.find((a: String) => a.toLowerCase().startsWith('height'));
  
  alt = alt ? alt.toLowerCase().replace('alt=', '') : '';
  width = width ? width.toLowerCase().replace('width=', '') : '';
  height = height ? height.toLowerCase().replace('height=', '') : '';

  return (<StyledImage width={width} height={height} alt={alt} src={props.src} />);
}