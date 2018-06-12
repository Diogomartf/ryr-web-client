import React, { Component } from 'react';
import Avatar, { MiniAvatar } from './ui/Avatar';
import { Container } from './ui/Container';
import { Section } from './ui/Section';
import VerificationCard from '../components/VerificationCard';
import { Row } from './ui/Row';
import { Title } from './ui/Typography';
import { Box } from 'rebass';

class UserProfileSidebar extends Component {
  render() {
    return (
      <Container>
        <Section>
          <Row alignItems="center">
            <Box>
              <MiniAvatar
                className={`hidden show-xs show-sm`}
                avatar={this.props.user.image_path}
              />
            </Box>
            <Box>
              <Title mt={0} className={`hidden show-xs show-sm`} px={2}>
                {this.props.user.first_name} {this.props.user.last_name}
              </Title>
            </Box>
          </Row>
          <Avatar
            className={`hidden show-md show-lg show-xl`}
            avatar={this.props.user.image_path}
          />
        </Section>
        <Section className={`hidden show-md show-lg show-xl`}>
          <VerificationCard verifications={this.props.verifications} />
        </Section>
      </Container>
    );
  }
}

export default UserProfileSidebar;
