// these sizes are arbitrary and you can set them to whatever you wish
import { css } from 'styled-components';
import theme from './theme';

const sizes = {
  giant: theme.breakpoints[4],
  desktop: theme.breakpoints[3],
  tablet: theme.breakpoints[2],
  miniTablet: theme.breakpoints[1],
  phone: theme.breakpoints[0]
};

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, entry) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[entry];
  accumulator[entry] = (...args) => css`
    @media (min-width: ${emSize}) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});
