import React from 'react';
import { SmallText } from '../ui/Typography';

const Rating = ({ stars, reviews }) => {
  return (
    <SmallText mt={[0, 1]}>
      {Array(stars + 1).join('☆')} from {reviews} Reviews
    </SmallText>
  );
};

export default Rating;
