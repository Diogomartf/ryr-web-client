import React, { Component } from 'react';
import { Title, Input, Row, Column, Section, Select, ThinLabel, Button } from '../../ui';
import GooglePlacesAutocomplete from '../../GooglePlacesAutocomplete';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import FormValidator from '../../../validations/FormValidator';
import { basicInfoStepValidations } from '../../../validations/DataValidations';

class BasicInfo extends Component {
  constructor(props) {
    super(props);
    const data = props.values;

    this.validator = new FormValidator(basicInfoStepValidations);

    this.state = {
      location: data ? data.location : '',
      vehicle_type_id: data ? data.vehicle_type_id : '',
      brand: data ? data.brand : '',
      model: data ? data.model : '',
      manufacturing_year: data ? data.manufacturing_year : '',
      license_plate: data ? data.license_plate : '',
      odometer: data ? data.odometer : '',
      lat: data ? data.lat : '',
      lng: data ? data.lng : '',
      validation: this.validator.valid()
    };

    this.submitted = false;
  }

  handleSubmit = step => {
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (validation.isValid) this.props.onChangeStep(step, this.state);
  };

  handleTypeChange = event => {
    this.setState({
      vehicle_type_id: event ? event.value : ''
    });
    this.props.customProps.onChangeVehicleType(event.value);
  };

  handleMakerChange = event => {
    this.setState({
      brand: event ? event.value : ''
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event ? event.target.value : ''
    });
  };

  handleLocationChange = location => {
    this.setState({ location });

    const promise = location
      ? geocodeByAddress(location).then(results => getLatLng(results[0]))
      : Promise.resolve();

    promise.then(latLng => {
      this.setState({ lat: latLng.lat });
      this.setState({ lng: latLng.lng });
    });
  };

  render() {
    let validation = this.submitted // if the form has been submitted at least\ once
      ? this.validator.validate(this.state) // then check validity every time we render
      : this.state.validation; // otherwise just use what's in state

    const locationInputProps = {
      value: this.state.location,
      onChange: this.handleLocationChange,
      placeholder: 'Location'
    };

    const { vehicleTypes } = this.props.customProps;
    return (
      <div>
        <Section>
          <Title fontWeight={'normal'}>
            We need to check if your vehicle is eligible
          </Title>
        </Section>
        <Section>
          <Row>
            <Column py={2} width={[1, 1, 2 / 3]}>
              <ThinLabel>Where is your vehicle located?</ThinLabel>
              <GooglePlacesAutocomplete
                name="location"
                regularInput={true}
                type="text"
                inputProps={locationInputProps}
                defaultValue={this.state.location}
                onChange={this.handleLocationChange}
                error={validation.location.message ? 'true' : ''}
                errormessage={validation.location.message}
              />
            </Column>

            <Column py={2} width={[1, 1, 1 / 3]}>
              <Select
                name="vehicle_type_id"
                key="vehicle_type_id"
                label="Type"
                value={this.state.vehicle_type_id}
                error={validation.vehicle_type_id.message ? 'true' : ''}
                errormessage={validation.vehicle_type_id.message}
                onChange={this.handleTypeChange}
                options={vehicleTypes.map(vt => ({
                  value: vt.id,
                  label: vt.name
                }))}
              />
            </Column>
          </Row>

          <Row>
            <Column py={2} width={[1, 1, 1 / 3]}>
              <Select
                name="brand"
                label="Maker"
                value={this.state.brand}
                options={[
                  { value: 'Tesla', label: 'Tesla' },
                  { value: 'Seat', label: 'Seat' },
                  { value: 'Renault', label: 'Renault' },
                  { value: 'Carroça', label: 'Carroça' }
                ]}
                error={validation.brand.message ? 'true' : ''}
                errormessage={validation.brand.message}
                onChange={this.handleMakerChange}
              />
            </Column>
            <Column py={2} width={[1, 1, 1 / 3]}>
              <Select
                name="model"
                label="Model"
                value={this.state.model}
                options={[
                  { value: 'Model 3', label: 'Model 3' },
                  { value: 'Model 1', label: 'Model 1' },
                  { value: 'BFC', label: 'BFC' }
                ]}
                error={validation.model.message ? 'true' : ''}
                errormessage={validation.model.message}
                onChange={value => {
                  this.handleChange({
                    target: {
                      name: 'model',
                      value: value ? value.value : ''
                    }
                  });
                }}
              />
            </Column>

            <Column py={2} width={[1, 1, 1 / 3]}>
              <Select
                name="manufacturing_year"
                label="Year"
                value={this.state.manufacturing_year}
                options={[
                  { value: '2015', label: '2015' },
                  { value: '2016', label: '2016' },
                  { value: '2017', label: '2017' }
                ]}
                error={validation.manufacturing_year.message ? 'true' : ''}
                errormessage={validation.manufacturing_year.message}
                onChange={value => {
                  this.handleChange({
                    target: {
                      name: 'manufacturing_year',
                      value: value ? value.value : ''
                    }
                  });
                }}
              />
            </Column>
          </Row>
          <Row>
            <Column py={2} width={[1, 1, 2 / 3]}>
              <Input
                name="license_plate"
                border="true"
                type="text"
                label="License Plate"
                placeholder="License Plate"
                onChange={this.handleChange}
                defaultValue={this.state.license_plate}
                error={validation.license_plate.message ? 'true' : ''}
                errormessage={validation.license_plate.message}
              />
            </Column>

            <Column py={2} width={[1, 1, 1 / 3]}>
              <Select
                name="odometer"
                label="Odometer (km)"
                value={this.state.odometer}
                options={[
                  { value: 1, label: '0 - 49k' },
                  { value: 2, label: '50 - 99k' },
                  { value: 3, label: '100 - 199k' },
                  { value: 4, label: '> 200k' }
                ]}
                error={validation.odometer.message ? 'true' : ''}
                errormessage={validation.odometer.message}
                onChange={value => {
                  this.handleChange({
                    target: { name: 'odometer', value: value ? value.value : '' }
                  });
                }}
              />
            </Column>
          </Row>
        </Section>
        <Row width={[1, 2 / 3, 3 / 4, 1 / 3]} my={2}>
          <Column width={1 / 2}>
            <Button onClick={() => this.handleSubmit(this.props.next)}>Next</Button>
          </Column>
        </Row>
      </div>
    );
  }
}

export default BasicInfo;
