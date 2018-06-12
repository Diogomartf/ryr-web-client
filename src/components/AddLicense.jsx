import React, { Component } from 'react';

import { Section, Row, Column, ThinLabel, Text } from './ui';
import ImageUpload from './ImageUpload';

class AddLicense extends Component {
  render() {
    return (
      <Section>
        <Text>In order to be able to rent, you have to upload your license.</Text>
        <Row>
          <Column width={[1, 1 / 2]} py={2}>
            <ThinLabel py={2}>Front</ThinLabel>
            <ImageUpload />
          </Column>
          <Column width={[1, 1 / 2]} py={2}>
            <ThinLabel py={2}>Back</ThinLabel>
            <ImageUpload />
          </Column>
        </Row>
      </Section>
    );
  }
}

export default AddLicense;
