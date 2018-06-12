import React, { Component } from 'react';
import { Flex, Box } from 'rebass';
import { SearchButton } from './ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import GooglePlacesAutocomplete from './GooglePlacesAutocomplete';
import { withRouter } from 'react-router-dom';

import { buildSearchQuery } from '../containers/Search';
import { updateCurrentRental } from '../redux/actions/current-rental-actions';
import DatePicker from './DatePicker';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleType: '',
      address: '',
      lat: undefined,
      lng: undefined,
      from: undefined,
      to: undefined
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onAddressChange = address => this.setState({ address });

  onVehicleTypeChange = vehicleType => {
    this.setState({ vehicleType });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    const promise = this.state.address
      ? geocodeByAddress(this.state.address).then(results => getLatLng(results[0]))
      : Promise.resolve();

    promise
      .then(latLng => {
        const params = {
          address: this.state.address || undefined,
          ...latLng,
          from: this.state.from,
          to: this.state.to,
          vehicleType: this.state.vehicleType.value
        };
        const searchURL = buildSearchQuery({
          address: this.state.address || undefined,
          ...latLng,
          from: this.state.from,
          to: this.state.to,
          vehicleType: this.state.vehicleType.value
        });
        this.props.updateCurrentRental(params);
        this.props.history.push(searchURL);
      })
      .catch(error => console.error('Error', error));
  };

  onFromChange = from =>
    this.setState({ from }, () => {
      if (!this.state.to) {
        this.focusTo();
      }
    });

  onToChange = to => this.setState({ to });

  focusTo() {
    this.timeout = setTimeout(() => this.to.getInput().focus(), 0);
  }

  render() {
    const { vehicleType } = this.state;
    const value = vehicleType && vehicleType.value;
    const addressInputProps = {
      value: this.state.address,
      onChange: this.onAddressChange,
      placeholder: 'Try "Braga"'
    };

    const from = this.state.from ? new Date(this.state.from * 1) : undefined;
    const to = this.state.to ? new Date(this.state.to * 1) : undefined;

    const modifiers = { start: from, end: to };
    const fromOrToday = from ? from : new Date();

    return (
      <ShadowBox w={[300, 560, 820]} m={'auto'} mt={[-200, -90]} p={40}>
        <form onSubmit={this.handleFormSubmit}>
          <Flex flexWrap="wrap" mx={-2}>
            <Box px={2} py={2} width={[1, 2 / 3]}>
              <Label>Where</Label>
              <GooglePlacesAutocomplete inputProps={addressInputProps} />
            </Box>
            <Box px={2} py={2} width={[1, 1 / 3]}>
              <LabelType>Type</LabelType>
              <Select
                className="SelectVehicleTypeSearch"
                name="form-field-name"
                value={value}
                onChange={this.onVehicleTypeChange}
                options={[
                  { value: 1, label: 'Cars' },
                  { value: 2, label: 'Boats' },
                  { value: 3, label: 'Trucks' }
                ]}
              />
            </Box>

            <Box px={2} py={2} w={[1, 1 / 3]}>
              <Label>From</Label>
              <DatePicker
                value={from}
                placeholder="From"
                onChange={this.onFromChange}
                dayPickerProps={{
                  selectedDays: [from, { from, to }],
                  disabledDays: { before: new Date(), after: to },
                  toMonth: to,
                  modifiers
                }}
              />
            </Box>

            <Box px={2} py={2} w={[1, 1 / 3]}>
              <Label>To</Label>
              <DatePicker
                dayPickerRef={element => (this.to = element)}
                value={to}
                placeholder="To"
                onChange={this.onToChange}
                dayPickerProps={{
                  selectedDays: [from, { from, to }],
                  disabledDays: { before: fromOrToday },
                  month: from,
                  fromMonth: from,
                  modifiers
                }}
              />
            </Box>

            <Box px={2} py={2} w={[1, 1 / 3]}>
              <SearchButton>Search</SearchButton>
            </Box>
          </Flex>
        </form>
      </ShadowBox>
    );
  }
}

const ShadowBox = Box.extend`
  padding: 20px;

  border-radius: ${props => props.theme.elements.borderRadius};

  background-color: ${props => props.theme.colors.dirtyWhite};
  box-shadow: ${props => props.theme.elements.shadows[0]};
`;

export const Label = Box.extend`
  padding: 6px 12px;

  background: white;
  color: ${props => props.theme.elements.text.color};

  font-size: 12px;
  font-weight: bold;
`;

const LabelType = Label.extend`
  width: -webkit-fill-available;
`;

const mapStateToProps = reduxState => ({
  currentRental: reduxState.currentRental
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateCurrentRental
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBox));
