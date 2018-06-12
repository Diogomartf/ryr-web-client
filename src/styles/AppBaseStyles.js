import styled from 'styled-components';
import { media } from './media';

export const AppBaseStyles = styled.div`
  font-family: ${props => props.theme.elements.font.family};

  .hidden {
    display: none;
  }

  .show-xs {
    display: block;
    ${media.miniTablet`
      display: none;
    `};
  }

  .show-sm {
    ${media.miniTablet`
    display: block;
    `};
    ${media.tablet`
      display: none;
    `};
  }

  .show-md {
    ${media.tablet`
      display: block;
    `};
    ${media.desktop`
      display: none;
    `};
  }

  .show-lg {
    ${media.desktop`
      display: block;
    `};
    ${media.giant`
      display: none;
    `};
  }

  .show-xl {
    ${media.giant`
      display: block;
    `};
  }
`;

export default AppBaseStyles;
