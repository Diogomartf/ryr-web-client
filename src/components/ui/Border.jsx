import sys from 'system-components';
import { Border as RebassBorder } from 'rebass';
import theme from '../../styles/theme';

export const Border = sys({
  is: RebassBorder,
  p: '20px',
  color: theme.colors.gray[5]
});

export default Border;
