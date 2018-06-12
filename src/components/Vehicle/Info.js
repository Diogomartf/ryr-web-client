import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Flex, Box } from 'rebass';
import { SmallText, Text, Section, Link, Row, Column } from '../ui';

import Features from './Features';
import Rating from './Rating';

const Info = ({ vehicle, sizeTop, sizeBottom }) => {
  return (
    <Row>
      <Column width={sizeTop}>
        <BoxTop
          id={vehicle.id}
          brand={vehicle.brand}
          model={vehicle.model}
          year={vehicle.manufacturing_year}
          sizes={sizeTop}
        />
        {sizeTop.length > 1 && (
          <BoxMiddle features={vehicle.features} user={vehicle.user} />
        )}
      </Column>
      <Column width={sizeBottom}>
        <BoxBottom price={vehicle.base_price} sizes={sizeBottom} />
      </Column>
    </Row>
  );
};

const BoxTop = ({ id, brand, model, year, reviews, sizes }) => {
  return (
    <Section width={sizes} py={2} mb={1}>
      <Flex flexWrap="wrap" justifyContent="space-between" alignItems="center">
        <Link is={RouterLink} to={`/vehicles/${id}`}>
          <Text fontWeight="bold">{`${brand} ${model}`}</Text>
        </Link>
        {sizes.length > 1 && (
          <SmallText className={`hidden show-lg show-xl`}>{year}</SmallText>
        )}
        <Box width={1}>
          <Rating stars={4} reviews={32} />
        </Box>
      </Flex>
    </Section>
  );
};

const BoxMiddle = ({ features, user }) => {
  return (
    <Section py={2} className={`hidden show-lg show-xl`}>
      <SmallText>
        <Row mb={3}>
          <Column>
            <strong>Main Features</strong>
            <Features mt={1} features={features} />
          </Column>
        </Row>
        <Box>
          <strong>Owned By</strong>
          <Box mt={1}>
            <Link is={RouterLink} to={`/users/${user.id}`}>
              {user.first_name + ' ' + user.last_name}
            </Link>
          </Box>
        </Box>
      </SmallText>
    </Section>
  );
};

const BoxBottom = ({ price, sizes }) => {
  return (
    <Section py={2}>
      {sizes.length > 1 && (
        <SmallText className={`hidden show-lg show-xl`} fontWeight={'bold'} mb={2}>
          Price per day
        </SmallText>
      )}
      <Text fontWeight={'bold'}>{price}€</Text>
      {sizes.length > 1 && (
        <SmallText className={`hidden show-xs show-sm show-md`}>per day</SmallText>
      )}
    </Section>
  );
};

export default Info;
