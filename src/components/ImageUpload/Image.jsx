import React from 'react';
import styled from 'styled-components';
import { Image as rebassImage } from 'rebass';

const Image = ({ source }) => {
  return <ImageCover src={source} />;
};

const ImageCover = styled(rebassImage)`
  object-fit: cover;
  height: 180px;
  width: 100%;
`;

export default Image;
