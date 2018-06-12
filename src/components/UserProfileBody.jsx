import React, { Component } from 'react';
import { Container } from './ui/Container';
import { Title, Text, SectionTitle } from './ui/Typography';
import { Section } from './ui/Section';
import { Row } from './ui/Row';
import { Column } from './ui/Column';
import ReviewsList from './ReviewsList';
import { Button } from './ui/Buttons';
import VehiclesCarousel from './Vehicle/VehiclesCarousel';

class UserProfileBody extends Component {
  render() {
    return (
      <Container>
        <Section className="hidden show-md show-lg show-xl">
          <Row>
            <Column>
              <Title>
                {this.props.user.first_name} {this.props.user.last_name}
              </Title>
            </Column>
          </Row>
        </Section>
        <Section>
          <Row />
        </Section>
        <Section>
          <Text>{this.props.user.description}</Text>
        </Section>

        {this.props.vehicles.length > 0 && (
          <Section>
            <SectionTitle>Vehicles</SectionTitle>
            <div className="hidden show-md show-lg show-xl">
              <VehiclesCarousel
                vehicles={this.props.vehicles}
                number={this.props.vehicles.length < 2 ? 1 : 2}
              />
            </div>
            <div className="hidden show-xs show-sm ">
              <VehiclesCarousel vehicles={this.props.vehicles} number={1} />
            </div>
          </Section>
        )}

        <Section>
          <ReviewsList reviews={this.props.user.reviews} />
          <Button>See More</Button>
        </Section>
      </Container>
    );
  }
}

export default UserProfileBody;
