import React, { Component } from 'react';
import { Card } from './ui/Cards';
import { Section } from './ui/Section';
import { Row } from './ui/Row';
import { Column } from './ui/Column';
import { MediumText, Text } from './ui/Typography';
import { Container } from './ui/Container';

class VerificationCard extends Component {
  lineVerificationsCard = verification => {
    return (
      <Section>
        <Row py={2}>
          <Column>
            <MediumText>{verification}</MediumText>
          </Column>

          <Column>
            <MediumText textAlign="right">Verified</MediumText>
          </Column>
        </Row>
      </Section>
    );
  };

  render = () => {
    if (this.props.verifications.length > 0) {
      return (
        <Section>
          <Card py={3}>
            <Container>
              <Section>
                <Text textAlign="center" fontWeight="bold">
                  Verifications
                </Text>
              </Section>
              {this.props.verifications.map((verification, index) => {
                return (
                  <Container key={index}>
                    {this.lineVerificationsCard(verification)}
                  </Container>
                );
              })}
            </Container>
          </Card>
        </Section>
      );
    }
  };
}

export default VerificationCard;
