import React from 'react';
import Feature from './Feature';
import { Box, Flex } from 'rebass';

const Features = ({ features, featureSize = 1 / 2, ...props }) =>
  !features ? null : (
    <Flex flexWrap="wrap" {...props}>
      {features.map(feature => (
        <Box key={feature.id} width={featureSize} py={1}>
          <Feature name={feature.name} image={feature.image_path} value={feature.value} />
        </Box>
      ))}
    </Flex>
  );

export default Features;
