import React from 'react';
import styled from 'styled-components';

export const SliderArrowLeft = ({ prevSlide }) => {
  return (
    <SlideArrow style={{ left: '0px' }} onClick={prevSlide}>
      {'<'}
    </SlideArrow>
  );
};

export const SliderArrowRight = ({ nextSlide }) => {
  return (
    <SlideArrow style={{ right: '0px' }} onClick={nextSlide}>
      {'>'}
    </SlideArrow>
  );
};

const SlideArrow = styled.div`
  position: absolute;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 45px;

  z-index: 2;

  opacity: 0.2;
  background: #000;
  color: #fff;

  cursor: pointer;

  &:hover {
    transition: transform ease-in 0.1s;
    transform: scale(1.1);
  }
`;
