import React, { Component } from 'react';
import { Flex } from 'rebass';

import { Section, Link } from './ui';

class License extends Component {
  render() {
    return (
      <div>
        <Section>
          <Flex justifyContent="space-between">
            <Link mt={2} mb={1}>
              Add license
            </Link>
          </Flex>
        </Section>
      </div>
    );
  }
}

export default License;
