import React from 'react';
import sys from 'system-components';
import { Button as RebassButton } from 'rebass';
import theme from '../../styles/theme';

export const ButtonLoader = ({ loading, children, ...props }) => {
  return <Button {...props}>{loading ? 'Loading...' : children}</Button>;
};

export const Button = sys(
  {
    is: RebassButton,
    width: 1,
    py: '12px',
    px: '16px',
    fontWeight: 'normal',
    textAlign: 'center',
    bg: 'primaryButton'
  },
  props => ({
    cursor: 'pointer',
    background: props.secondary
      ? theme.colors.secondaryButton
      : props.background
        ? props.background
        : null,
    color: props.color ? props.color : 'white',
    fontSize: props.fontSize ? props.fontSize : '14px'
  })
);

export const SearchButton = sys({
  is: Button,
  height: '100%',
  padding: '20px',
  fontSize: '16px',
  fontWeight: 'bold'
});

export default Button;
