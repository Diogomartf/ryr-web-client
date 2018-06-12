import React, { Component } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { Box } from 'rebass';
import 'react-select/dist/react-select.css';

import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import GooglePlacesAutocomplete from './GooglePlacesAutocomplete';

import DatePicker from './DatePicker';
import Container from './ui/Container';
import Row from './ui/Row';
import Column from './ui/Column';
import { MediumText } from './ui/Typography';

class MenuSearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: props.address || ''
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  componentWillReceiveProps(props) {
    this.setState({ address: props.address });
  }

  onAddressChange = address => this.setState({ address });
  onAddressSelected = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.props.onChange({ address, ...latLng });
      })
      .catch(error => console.error('Error', error));
  };
  onToChange = to => this.props.onChange({ to });
  onVehicleTypeChange = vehicleType =>
    this.props.onChange({ vehicleType: vehicleType ? vehicleType.value : undefined });

  onFromChange = from => {
    this.props.onChange({ from });
    if (!this.props.to) {
      this.focusTo();
    }
  };

  focusTo() {
    this.timeout = setTimeout(() => this.to.getInput().focus(), 0);
  }

  render() {
    const addressInputProps = {
      value: this.state.address,
      onChange: this.onAddressChange,
      placeholder: 'City'
    };

    const from = this.props.from ? new Date(this.props.from * 1) : undefined;
    const to = this.props.to ? new Date(this.props.to * 1) : undefined;

    const modifiers = { start: from, end: to };
    const fromOrToday = from ? from : new Date();

    return (
      <MenuSearch>
        <Container>
          <Row alignItems="center">
            <Column width={[1, 1 / 2, 1 / 4]} py={1}>
              <Row alignItems="center">
                <Column w={[0.15, 0.15, 0.25]}>
                  <MediumText textAlign="right" fontWeight="bold">
                    Where
                  </MediumText>
                </Column>
                <Column w={[0.85, 0.85, 0.75]}>
                  <GooglePlacesAutocomplete
                    inputProps={addressInputProps}
                    onSelect={this.onAddressSelected}
                    autocompleteWidth={'200%'}
                  />
                </Column>
              </Row>
            </Column>

            <Column width={[1, 1 / 2, 1 / 4]} py={1}>
              <Row alignItems="center">
                <Column w={[0.15, 0.15, 0.25]}>
                  <MediumText textAlign="right" fontWeight="bold">
                    From
                  </MediumText>
                </Column>
                <Column w={[0.85, 0.85, 0.75]}>
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
                </Column>
              </Row>
            </Column>

            <Column width={[1, 1 / 2, 1 / 4]} py={1}>
              <Row alignItems="center">
                <Column w={[0.15, 0.15, 0.25]}>
                  <MediumText textAlign="right" fontWeight="bold">
                    To
                  </MediumText>
                </Column>
                <Column w={[0.85, 0.85, 0.75]}>
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
                </Column>
              </Row>
            </Column>

            <Column width={[1, 1 / 2, 1 / 4]} py={1}>
              <Row alignItems="center">
                <Column w={[0.15, 0.15, 0.25]}>
                  <MediumText textAlign="right" fontWeight="bold">
                    Type
                  </MediumText>
                </Column>
                <Column w={[0.85, 0.85, 0.75]}>
                  <VehicleTypeSelectBox>
                    <VehicleTypeSelect
                      className="SelectVehicleTypeSearch"
                      value={this.props.vehicleType}
                      onChange={this.onVehicleTypeChange}
                      options={this.props.vehicleTypes.map(vt => ({
                        value: vt.id,
                        label: vt.name
                      }))}
                    />
                  </VehicleTypeSelectBox>
                </Column>
              </Row>
            </Column>
          </Row>
        </Container>
      </MenuSearch>
    );
  }
}

const MenuSearch = Box.extend`
  background-color: ${props => props.theme.elements.searchNavBar.backgroundColor};
`;

const VehicleTypeSelectBox = styled.div`
  align-items: center;
  width: 100%;
`;

const VehicleTypeSelect = styled(Select)`
  color: ${props => props.theme.elements.searchNavBar.labelColor};
`;

export default MenuSearchBox;
