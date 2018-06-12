import React from 'react';
import styled from 'styled-components';
import { Flex, Relative } from 'rebass';
import 'react-accessible-accordion/dist/minimal-example.css';

import {
  Accordion as ReactAccordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from 'react-accessible-accordion';

import { SectionTitle, Link } from './index';

export const Accordion = props => {
  return (
    <AccordionStyle accordion="true">
      {props.expanded ? (
        <AccordionItem expanded="true">
          <AccordionItemTitle>
            <Relative>
              <Flex justifyContent="space-between" alignItems="center">
                <SectionTitle py={2}>{props.title}</SectionTitle>

                {props.link ? (
                  <Link>{props.link}</Link>
                ) : (
                  <div className="accordion__arrow" role="presentation" />
                )}
              </Flex>
            </Relative>
          </AccordionItemTitle>
          <AccordionItemBody>{props.body}</AccordionItemBody>
        </AccordionItem>
      ) : (
        <AccordionItem>
          <AccordionItemTitle>
            <Relative>
              <Flex justifyContent="space-between" alignItems="center">
                <SectionTitle py={2}>{props.title}</SectionTitle>

                {props.link ? (
                  <Link>{props.link}</Link>
                ) : (
                  <div className="accordion__arrow" role="presentation" />
                )}
              </Flex>
            </Relative>
          </AccordionItemTitle>
          <AccordionItemBody>{props.body}</AccordionItemBody>
        </AccordionItem>
      )}
    </AccordionStyle>
  );
};

const AccordionStyle = styled(ReactAccordion)`
  > .accordion__item {
    padding-bottom: 8px;
  }
`;
