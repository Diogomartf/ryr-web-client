import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { BackgroundImage, Box, Heading } from 'rebass';
import { Container, Row, Column, Section, SectionTitle } from '../components/ui';
import { media } from '../styles/media';

import SearchBox from '../components/SearchBox';

import { getHomeElements } from '../redux/actions/home-actions';
import Loading from '../components/ui/Loading';
import VehicleCard from '../components/Vehicle/VehicleCard';

const HomeVehicles = ({ loading, vehicleIds }) => {
  if (loading) {
    return <Loading />;
  }

  return (
    <Row>
      {vehicleIds.map(id => (
        <Column width={[1, 1 / 2, 1 / 3]} key={id}>
          <VehicleCard
            sizeLeft={[1]}
            sizeRight={[1]}
            sizeInfoTop={[4 / 5]}
            sizeInfoBottom={[1 / 5]}
            key={id}
            id={id}
          />
        </Column>
      ))}
    </Row>
  );
};

class Home extends Component {
  componentWillMount() {
    this.props.getHomeElements();
  }

  render() {
    return (
      <div>
        <BgImage
          ratio={1 / 4}
          src="https://images.unsplash.com/photo-1506714260631-1b0f54c0f231?ixlib=rb-0.3.5&s=0bb7c9127959ec7a04c489884febf95d&auto=format&fit=crop&w=1650&q=80"
        >
          <Box m={'auto'} w={[300, 560, 820]}>
            <Heading align="center" color={'white'} fontSize={[5, 6]} pt={50} mb={10}>
              Rent your ride. Go Anywhere
            </Heading>
          </Box>
        </BgImage>

        <SearchBox />

        <Container>
          <Section py={[4, 5]}>
            <SectionTitle>Most Recent Vehicles </SectionTitle>
            <HomeVehicles
              loading={this.props.loading}
              vehicleIds={this.props.vehicleIds}
            />
          </Section>
        </Container>
      </div>
    );
  }
}

const BgImage = BackgroundImage.extend`
  height: 300px;

  ${media.desktop`
    height: 0;
  `};
`;

const mapStateToProps = reduxState => ({
  home: reduxState.home.loading,
  vehicleIds: reduxState.home.results
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getHomeElements
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
