import React, { Component } from 'react';
import { Section } from './ui/Section';
import { MiniAvatar } from './ui/Avatar';
import { Text, SmallText, NoteText } from './ui/Typography';
import { Divider } from './ui/Dividers';

import { Flex, Box } from 'rebass';

class Review extends Component {
  render() {
    return (
      <Section>
        <Flex>
          <Box px={2}>
            <MiniAvatar avatar={this.props.review.avatar} />
            <SmallText my={1} textAlign="center">
              {this.props.review.username}
            </SmallText>
          </Box>
          <Box px={2}>
            <Text>{this.props.review.textReview}</Text>
          </Box>
        </Flex>

        <Section>
          <NoteText textAlign="right">{this.props.review.dateReview}</NoteText>
          <Divider pt={1} />
        </Section>
      </Section>
    );
  }
}

export default Review;
