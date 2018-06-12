import sys from 'system-components';
import { Link as RebassLink } from 'rebass';
import theme from '../../styles/theme';

export const Link = sys(
  {
    is: RebassLink
  },
  props => ({
    cursor: 'pointer',
    color: props.secondary ? theme.colors.secondaryLink : theme.colors.primaryLink,
    textDecoration: props.secondary ? null : 'none'
  })
);

export default Link;
