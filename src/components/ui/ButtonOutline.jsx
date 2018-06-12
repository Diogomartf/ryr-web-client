import styled from 'styled-components';
import { themeGet } from 'styled-system';
import Button from './Buttons';

export const ButtonOutline = styled(Button)([], props => ({
  boxShadow: `inset 0 0 0 2px`,
  '&:hover': {
    color: themeGet('colors.primaryColor')(props),
    boxShadow: `inset 0 0 0 2px ${themeGet('colors.primaryColor')(props)}`
  },
  '&:active': {
    backgroundColor: 'primaryButton',
    boxShadow: `inset 0 0 0 2px ${themeGet('colors.' + props.color)(props)}`
  }
}));

ButtonOutline.displayName = 'ButtonOutline';

ButtonOutline.defaultProps = {
  color: 'secondaryColor',
  bg: 'transparent'
};

export default ButtonOutline;
