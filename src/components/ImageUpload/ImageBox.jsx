import React from 'react';
import styled from 'styled-components';
import { Box } from 'rebass';

const ImageBox = ({ children }) => {
  return <SolidBox> {children} </SolidBox>;
};

const SolidBox = styled(Box)`
  border-width: 2px;
  border-color: #666;
  border-style: solid;
  display: flex;
  position: relative;
`;

export default ImageBox;
