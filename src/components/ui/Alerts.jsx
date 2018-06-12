import React from 'react';
import { Box } from 'rebass';

export const Alert = props => (
  <AlertBox width={1} mb={4} px={1} py={3} fontSize={1} {...props}>
    {props.children}
  </AlertBox>
);

Alert.success = props => (
  <SuccessAlert width={1} mb={4} px={1} py={3} fontSize={1} {...props}>
    {props.children}
  </SuccessAlert>
);

Alert.error = props => (
  <ErrorAlert width={1} mb={4} px={1} py={3} fontSize={1} {...props}>
    {props.children}
  </ErrorAlert>
);

Alert.warning = props => (
  <WarningAlert width={1} mb={4} px={1} py={3} fontSize={1} {...props}>
    {props.children}
  </WarningAlert>
);

const AlertBox = Box.extend`
  border-radius: ${props => props.theme.elements.borderRadius};
  color: white;
  background: ${props => props.theme.colors.primaryColor};
  text-align: center;
`;

const ErrorAlert = AlertBox.extend`
  color: white;
  background: ${props => props.theme.colors.red};
`;

const SuccessAlert = AlertBox.extend`
  color: ${props => props.theme.colors.green};
  background: ${props => props.theme.colors.lightGreen};
`;

const WarningAlert = AlertBox.extend`
  color: ${props => props.theme.colors.brown};
  background: ${props => props.theme.colors.yellow};
`;
