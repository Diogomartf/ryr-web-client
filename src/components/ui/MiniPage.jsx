import sys from 'system-components';
import { Container } from './Container';

export const MiniPage = sys({
  is: Container,
  maxWidth: 460,
  py: [3, 4]
});

export default MiniPage;
