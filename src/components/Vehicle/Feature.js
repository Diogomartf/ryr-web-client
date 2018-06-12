import React from 'react';
import { Flex, Image as Icon } from 'rebass';

const Feature = ({ name, image, value, iconSize = '13px' }) => {
  return (
    <Flex align="center">
      <div>
        <Icon mx={'4px'} width={iconSize} src={image} />
      </div>
      {value > 0 && value + ' '}
      {name}
    </Flex>
  );
};

export default Feature;
