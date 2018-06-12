import React from 'react';
import {
  Flex,
  Box,
  Input as RebassInput,
  Label as RebassLabel,
  Textarea as RebassTextArea,
  Image
} from 'rebass';
import { MediumText } from './Typography';
import { Tooltip } from './Tooltip';

export const Input = props => {
  return (
    <Box {...props}>
      <Labels
        label={props.label}
        linktext={props.linktext}
        link={props.link}
        tooltip={props.tooltip}
      />
      {props.border ? (
        <InputWithBorder
          name={props.name}
          error={props.error}
          type={props.type}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
      ) : (
        <InputWithoutBorder
          name={props.name}
          error={props.error}
          type={props.type}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
      )}
      <ErrorMessage p={1} error={props.error}>
        {props.errormessage}
      </ErrorMessage>
    </Box>
  );
};

export const HorizontalInput = props => {
  return (
    <Flex width={[1 / 2, 1 / 2, 1 / 4]} alignItems={'center'}>
      <MediumText p={props.p} fontWeight="bold">
        {props.name}
      </MediumText>

      {props.border ? (
        <InputWithBorder {...props} px={2} />
      ) : (
        <InputWithoutBorder {...props} px={2} />
      )}
    </Flex>
  );
};

export const TextArea = props => {
  return (
    <Box {...props}>
      <Labels label={props.label} linktext={props.linktext} link={props.link} />
      <TextAreaWithBorder
        rows={props.rows}
        error={props.error}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        value={props.value}
      />
    </Box>
  );
};

const TextAreaWithBorder = RebassTextArea.extend`
  box-sizing: border-box;

  line-height: 100%;

  border: 1.5px solid;
  border-color: ${props =>
    props.error ? props.theme.colors.red : props.theme.elements.input.color};
  border-radius: ${props => props.theme.elements.borderRadius};

  color: ${props => props.theme.elements.text.color};
  background: white;

  outline: none;
`;

const InputWithBorder = RebassInput.extend`
  box-sizing: border-box;

  line-height: 100%;

  border: 1.5px solid;
  border-color: ${props =>
    props.error ? props.theme.colors.red : props.theme.elements.input.color};
  border-radius: ${props => props.theme.elements.borderRadius};

  color: ${props => props.theme.elements.text.color};
  background: white;

  outline: none;
`;

const InputWithoutBorder = RebassInput.extend`
  box-sizing: border-box;

  height: 100%;
  background: ${props => props.theme.elements.input.backgroundColor};

  outline: none;
`;

export const BoldLabel = RebassLabel.extend`
  font-weight: bold;
  color: ${props => props.theme.elements.text.color};
`;

const ErrorMessage = Box.extend`
  display: ${props => (props.error ? 'flex' : 'none')};
  font-size: 12px;
  color: ${props => props.theme.colors.red};
`;

export const ThinLabel = RebassLabel.extend`
  color: ${props => props.theme.elements.text.color};
`;

const Labels = props => {
  return (
    <div>
      {props.tooltip ? (
        <Flex>
          <ThinLabel>{props.label}</ThinLabel>
          <ThinLabel is="a" href={props.link} tabIndex="-1">
            {props.linktext}
          </ThinLabel>

          <Tooltip text={props.tooltip}>
            <Image
              src="https://image.flaticon.com/icons/svg/149/149462.svg"
              p="2px"
              ml="2px"
              height="13px"
              width="13px"
            />
          </Tooltip>
        </Flex>
      ) : (
        <Flex justifyContent={'space-between'}>
          <ThinLabel>{props.label}</ThinLabel>
          <ThinLabel is="a" href={props.link} tabIndex="-1">
            {props.linktext}
          </ThinLabel>
        </Flex>
      )}
    </div>
  );
};
