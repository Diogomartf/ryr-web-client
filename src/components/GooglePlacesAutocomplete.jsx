import React from 'react';
import { Flex, Box } from 'rebass';
import styled from 'styled-components';
import 'react-select/dist/react-select.css';
import PlacesAutocomplete from 'react-places-autocomplete';
import theme from '../styles/theme';
import PoweredByGoogleLogo from '../images/powered_by_google_on_white.png';
import { Fragment } from 'react';

const options = {
  types: ['geocode'],
  componentRestrictions: { country: 'pt' }
};

const GooglePlacesAutocomplete = ({
  inputProps,
  autocompleteWidth,
  regularInput,
  ...props
}) => (
  <Fragment>
    <PlacesAutocomplete
      styles={defaultStyles(autocompleteWidth, regularInput, props.error)}
      {...props}
      inputProps={inputProps}
      options={options}
      renderFooter={renderFooter}
    />
    <ErrorMessage p={1} error={props.error}>
      {props.errormessage}
    </ErrorMessage>
  </Fragment>
);

export default GooglePlacesAutocomplete;

const renderFooter = () => (
  <Flex p={3} justifyContent={'flex-end'}>
    <Box>
      <GoogleImage src={PoweredByGoogleLogo} />
    </Box>
  </Flex>
);

const GoogleImage = styled.img`
  width: 110px;
`;

const defaultStyles = (autocompleteWidth, regularInput, error) => {
  return {
    root: {
      width: '100%'
    },
    input: {
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      padding: regularInput ? '8px 4px' : '10px 12px',
      backgroundColor: 'white',
      border: regularInput ? theme.borders[2] : 'none',
      borderColor: error ? theme.colors.red : theme.elements.input.color,
      borderRadius: regularInput ? theme.elements.borderRadius : 'none',
      outline: 'none'
    },
    autocompleteContainer: {
      position: 'absolute',
      top: '110%',
      width: autocompleteWidth ? autocompleteWidth : '100%',
      zIndex: '4',
      border: '0',
      backgroundColor: 'white',
      boxShadow: theme.elements.shadows[0]
    },
    autocompleteItem: {
      padding: '10px',
      backgroundColor: 'white',
      color: theme.elements.text.color,
      cursor: 'pointer'
    },
    autocompleteItemActive: {
      backgroundColor: theme.colors.gray[5]
    }
  };
};
const ErrorMessage = Box.extend`
  display: ${props => (props.error ? 'flex' : 'none')};
  font-size: 12px;
  color: ${props => props.theme.colors.red};
`;
