import React, { Component } from 'react';

import { Title, Section, Text, Button, Row, Column } from '../../ui';

class PublishVehicle extends Component {
  handleSubmit = step => {
    this.props.onChangeStep(step);
  };

  render() {
    return (
      <div>
        <Title fontWeight={'normal'}>Publish your listening</Title>
        <Section>
          <Text>
            That’s everything we needed! You’re now ready to list your car on Rent your
            ridde. Remember, you can edit your listing and availability anytime using your
            car settings.
          </Text>
        </Section>
        <Row width={[1, 2 / 3, 3 / 4, 1 / 3]} my={2}>
          <Column width={1 / 2}>
            <Button onClick={() => this.handleSubmit(this.props.previous)}>Back</Button>
          </Column>
          <Column width={1 / 2}>
            <Button onClick={() => this.props.customProps.onSubmit()}>Publish!</Button>
          </Column>
        </Row>
      </div>
    );
  }
}

export default PublishVehicle;
