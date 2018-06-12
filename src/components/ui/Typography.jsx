import React from 'react';
import { Text as RebassText } from 'rebass';

export const Title = props => {
  return <TitleStyle fontWeight={'bold'} fontSize={[4, 5]} mt={4} mb={1} {...props} />;
};

export const SectionTitle = props => {
  return <TitleStyle fontSize={[3, 4]} mt={2} mb={[2, 3]} {...props} />;
};

export const Text = props => {
  return <TextStyle fontSize={[1, 2]} {...props} />;
};

export const MediumText = props => {
  return <TextStyle fontSize={1} {...props} />;
};

export const SmallText = props => {
  return <TextStyle fontSize={0} {...props} />;
};

export const NoteText = props => {
  return <NoteTextStyle fontSize={0} {...props} />;
};

const TitleStyle = RebassText.extend`
  line-height: 1.25;
  color: ${props => props.theme.elements.text.color};
`;

const TextStyle = RebassText.extend`
  color: ${props => props.theme.elements.text.color};
`;

const NoteTextStyle = RebassText.extend`
  color: ${props => props.theme.elements.text.noteColor};
`;
