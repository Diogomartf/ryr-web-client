import React from 'react';
import styled from 'styled-components';
import ReactSelect from 'react-select';
import { Box } from 'rebass';

import { ThinLabel } from './Forms';
import 'react-select/dist/react-select.css';

export const Select = props => {
  return (
    <Box>
      <ThinLabel>{props.label}</ThinLabel>
      <SelectStyle className="SelectCC" {...props} />
      <ErrorMessage p={1} error={props.error}>
        {props.errormessage}
      </ErrorMessage>
    </Box>
  );
};

const SelectStyle = styled(ReactSelect)`
  margin-bottom: 4px;

  font-size: inherit;

  > .Select-control {
    height: 41px;

    border: 1.5px solid
      ${props =>
        props.error ? props.theme.colors.red : props.theme.elements.select.color};
    border-radius: ${props => props.theme.elements.borderRadius};

    color: ${props => props.theme.elements.text.color};
    background: white;
  }

  > .Select-value {
    padding: 4px 8px;
  }
`;

const ErrorMessage = Box.extend`
  display: ${props => (props.error ? 'flex' : 'none')};
  font-size: 12px;
  color: ${props => props.theme.colors.red};
`;
