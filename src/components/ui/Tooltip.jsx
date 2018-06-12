import { Tooltip as RebassTooltip } from 'rebass';

export const Tooltip = RebassTooltip.extend`
  &:before {
    background-color: ${props => props.theme.colors.black};
    padding: 8px 10px;
    border-radius: 3px;
    color: white;
    font-size: 12px;
  }

  &:after {
    border-color: ${props => props.theme.colors.black} transparent transparent;
  }
`;

export default Tooltip;
