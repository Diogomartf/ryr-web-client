import React, { Component } from 'react';

import { SectionTitle, MediumText, Section } from '../../ui';

import { Flex, Box } from 'rebass';

class StepsBar extends Component {
  boldStep = (index, number) => {
    if (index === number) {
      return 'bold';
    } else {
      return 'normal';
    }
  };

  render() {
    return (
      <Section>
        <Flex>
          {this.props.steps.map((stepItem, index) => {
            const numberStep = index + 1;
            return (
              <Box
                justifyContent="center"
                key={index}
                width={1 / this.props.steps.length}
                onClick={() => this.props.onClick(index)}
                style={{ cursor: 'pointer' }}
              >
                <SectionTitle
                  textAlign="center"
                  fontSize={[4, 5]}
                  fontWeight={this.boldStep(index, this.props.number)}
                >
                  {numberStep}
                </SectionTitle>
                <MediumText
                  textAlign="center"
                  fontWeight={this.boldStep(index, this.props.number)}
                >
                  {stepItem.description}
                </MediumText>
              </Box>
            );
          })}
        </Flex>
      </Section>
    );
  }
}

export default StepsBar;
