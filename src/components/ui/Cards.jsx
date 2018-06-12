import React from 'react';
import sys from 'system-components';
import { BackgroundImage, Box } from 'rebass';

export const Card = sys({
  is: Box,
  border: 2,
  borderRadius: 2
});

export const ImageCard = ({ url, children, ...props }) => {
  return (
    <Card {...props}>
      <BackgroundImage src={url} />
      {children}
    </Card>
  );
};
