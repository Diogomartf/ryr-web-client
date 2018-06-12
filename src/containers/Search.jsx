import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'qs';

import { updateCurrentRental } from '../redux/actions/current-rental-actions';

import { searchVehicles } from '../redux/actions/search-actions';
import { getSearchVehicles } from '../redux/selectors/search-selectors';

import { getVehicleTypes } from '../redux/selectors/vehicle-type-selector';
import { fetchVehicleTypesList } from '../redux/actions/vehicle-type-actions';

import Page, { Sidebar, Body } from '../components/ui/Page';
import Row from '../components/ui/Row';
import Loading from '../components/ui/Loading';
import SearchFilters from '../components/SearchFilters';
import VehiclesList from '../components/VehiclesList';
import MenuSearchBox from '../components/MenuSearchBox';

export const buildSearchQuery = ({ url, ...rest }) =>
  '/search' +
  '?' +
  queryString.stringify({
    ...rest,
    from: rest.from ? new Date(rest.from * 1).getTime() : undefined,
    to: rest.to ? new Date(rest.to * 1).getTime() : undefined
  });

class Search extends Component {
  constructor(props) {
    super(props);
    this.searchParams = queryString.parse(props.location.search.slice(1));
    this.sideFilters = {
      priceRange: [125, 248],
      mileageRange: [15, 48],
      items: []
    };
  }

  componentDidMount() {
    this.props.fetchVehicleTypesList();

    // URL from Landing page
    if (this.props.location.search) {
      this.searchParams = queryString.parse(this.props.location.search.slice(1));
      this.searchParams = {
        ...this.searchParams,
        from: this.searchParams.from ? new Date(this.searchParams.from * 1) : undefined,
        to: this.searchParams.to ? new Date(this.searchParams.to * 1) : undefined
      };
      var url = buildSearchQuery(this.searchParams);
      this.searchParams = {
        ...this.searchParams,
        url: url
      };
    }

    // Coming from another page
    else if (this.props.currentRental.url) {
      url = this.props.currentRental.url;
      this.searchParams = { ...this.props.currentRental };
      this.searchParams = {
        ...this.searchParams,
        from: this.searchParams.from ? new Date(this.searchParams.from * 1) : undefined,
        to: this.searchParams.to ? new Date(this.searchParams.to * 1) : undefined
      };
    }

    this.props.updateCurrentRental(this.searchParams);
    this.props.history.push(url);
    this.search();
  }

  componentWillReceiveProps(newProps) {
    // Changing filters
    if (newProps.location.search !== this.props.location.search) {
      this.searchParams = queryString.parse(newProps.location.search.slice(1));
      this.searchParams = {
        ...this.searchParams,
        from: this.searchParams.from ? new Date(this.searchParams.from * 1) : undefined,
        to: this.searchParams.to ? new Date(this.searchParams.to * 1) : undefined
      };
      var url = buildSearchQuery(this.searchParams);
      this.searchParams = {
        ...this.searchParams,
        url: url
      };

      // Clicking on Search Button while on Search Page (doesn't update URL)
      if (!newProps.location.search && this.props.currentRental.url) {
        this.props.history.push(this.props.currentRental.url);
      } else {
        // Update URL
        this.props.updateCurrentRental(this.searchParams);
        this.search();
      }
    }
  }

  onMenuSearchBoxChange = values => {
    this.searchParams = { ...this.searchParams, ...values };

    const url = buildSearchQuery(this.searchParams);
    this.searchParams = {
      ...this.searchParams,
      from: this.searchParams.from,
      to: this.searchParams.to,
      url: url
    };

    this.props.updateCurrentRental(this.searchParams);
    this.props.history.push(url);
  };

  onFiltersChanged = updatedFields => {
    this.sideFilters = { ...this.sideFilters, ...updatedFields };
    this.search();
  };

  search = () => {
    this.props.searchVehicles({
      ...this.props.currentRental,
      vehicle_type_id: this.searchParams.vehicleType,
      min_price: this.sideFilters.priceRange[0],
      max_price: this.sideFilters.priceRange[1],
      min_mileage: this.sideFilters.mileageRange[0],
      max_mileage: this.sideFilters.mileageRange[1],
      features: this.sideFilters.items
    });
  };

  render() {
    return (
      <div>
        <MenuSearchBox
          address={this.searchParams.address || ''}
          lat={this.searchParams.lat}
          lng={this.searchParams.lng}
          from={this.searchParams.from}
          to={this.searchParams.to}
          vehicleType={this.searchParams.vehicleType}
          vehicleTypes={this.props.vehicleTypes}
          onChange={this.onMenuSearchBoxChange}
        />

        <Page>
          <Row>
            <Sidebar w={[1, 2 / 5, 1 / 4]}>
              <SearchFilters
                vehicleTypeId={this.searchParams.vehicleType}
                priceRange={this.sideFilters.priceRange}
                mileageRange={this.sideFilters.mileageRange}
                checkItems={this.sideFilters.items}
                onChange={this.onFiltersChanged}
              />
            </Sidebar>

            <Body w={[1, 3 / 5, 3 / 4]}>
              {this.props.search.loading ? (
                <Loading />
              ) : (
                <VehiclesList vehicles={this.props.vehicles} />
              )}
            </Body>
          </Row>
        </Page>
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  search: reduxState.search,
  vehicles: getSearchVehicles(reduxState),
  vehicleTypes: getVehicleTypes(reduxState),
  currentRental: reduxState.currentRental
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateCurrentRental,
      searchVehicles,
      fetchVehicleTypesList
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Search);
