import React, { Component } from 'react';
import { Flex } from 'rebass';
import {
  Section,
  ImageCard,
  Divider,
  Container,
  Row,
  Column,
  MediumText,
  SmallText,
  SectionTitle
} from './ui';

import moment from 'moment';

import Rating from '../components/Vehicle/Rating';

const formatDate = date => moment(date).format('D MMM');

class RentalCard extends Component {
  render() {
    const { vehicle, from, to } = this.props;
    return (
      <ImageCard url={vehicle.images[0].image_url}>
        <Container mx={3} py={3}>
          <Section>
            <Flex alignItems={'baseline'}>
              <SectionTitle fontWeight={'bold'}>
                {`${vehicle.brand} ${vehicle.model}`}
              </SectionTitle>

              <SmallText px={1}>{vehicle.manufacturing_year}</SmallText>
            </Flex>
            <Rating stars={4} reviews={32} />
          </Section>

          <Divider />

          <Section>
            <Row alignItems="center">
              <Column w={1 / 3}>
                <MediumText fontWeight={'bold'}>{formatDate(from)}</MediumText>
                <SmallText>13:30 PM</SmallText>
              </Column>
              <Column w={1 / 3}>
                <MediumText align="center">-></MediumText>
              </Column>
              <Column w={1 / 3}>
                <MediumText fontWeight={'bold'} align="right">
                  {formatDate(to)}
                </MediumText>
                <SmallText align="right">11:00 AM</SmallText>
              </Column>
            </Row>
          </Section>
          <Divider />
          <Section>
            <Row>
              <Column>
                <MediumText fontWeight={'bold'} pb={1}>
                  Meeting location
                </MediumText>
                <MediumText>Rua dos Chãos</MediumText>
              </Column>
            </Row>
          </Section>
        </Container>
      </ImageCard>
    );
  }
}

export default RentalCard;
