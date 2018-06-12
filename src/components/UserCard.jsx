import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Row, Container, SmallText, Card, Column, Link } from './ui';
import { MiniAvatar } from './ui/Avatar';

class UserCard extends Component {
  render() {
    const user = this.props.user;
    const image_path = user.image_path
      ? user.image_path
      : 'https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png';
    return (
      <Card>
        <Container mx={3} py={3}>
          <Row alignItems={'center'}>
            <Column width={2 / 3}>
              <SmallText fontWeight={'bold'} pb={1}>
                Owned by
              </SmallText>
              <SmallText>
                <Link is={RouterLink} to={`/users/${user.id}`}>
                  {user.first_name + ' ' + user.last_name}
                </Link>
              </SmallText>
            </Column>
            <Column width={1 / 3}>
              <Link is={RouterLink} to={`/users/${user.id}`}>
                <MiniAvatar avatar={image_path} />
              </Link>
            </Column>
          </Row>
        </Container>
      </Card>
    );
  }
}

export default UserCard;
