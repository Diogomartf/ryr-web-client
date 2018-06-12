import React, { Component } from 'react';
import {
  Title,
  SectionTitle,
  Row,
  Column,
  Section,
  Input,
  MediumText,
  SmallText,
  Button
} from '../../ui';
import FormValidator from '../../../validations/FormValidator';
import { rentalInfoStepValidations } from '../../../validations/DataValidations';
import TimePicker from '../../TimePicker';

class RentalInfo extends Component {
  constructor(props) {
    super(props);
    const data = props.values;

    this.validator = new FormValidator(rentalInfoStepValidations);

    this.state = {
      pick_start_time: data ? data.pick_start_time : '',
      pick_end_time: data ? data.pick_end_time : '',
      deliver_start_time: data ? data.deliver_start_time : '',
      deliver_end_time: data ? data.deliver_end_time : '',
      base_price: data ? data.base_price : '',
      validation: this.validator.valid()
    };

    this.submitted = false;
  }

  handleSubmit = step => {
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (validation.isValid || step < 0) this.props.onChangeStep(step, this.state);
  };

  handlePriceChange = event => {
    this.setState({
      base_price: event.target.value
    });
  };

  handlePickerChange = event => {
    this.setState({
      [event.target.name]: event ? event.target.value : ''
    });
  };

  render() {
    let validation = this.submitted // if the form has been submitted at least\ once
      ? this.validator.validate(this.state) // then check validity every time we render
      : this.state.validation;
    return (
      <div>
        <Title fontWeight={'normal'}>Setup the rental</Title>
        <Section>
          <SectionTitle>Set the pricing</SectionTitle>
          <SmallText py={2}>Set minimum daily price for vehicle</SmallText>
          <Row alignItems="center">
            <Column width={[1 / 3, 2 / 5, 2 / 12]} pr={0}>
              <Input
                name="base_price"
                border="true"
                type="text"
                placeholder="Price"
                error={validation.base_price.message ? 'true' : ''}
                errormessage={validation.base_price.message}
                defaultValue={this.state.base_price}
                onChange={this.handlePriceChange}
              />
            </Column>
            <Column width={[2 / 3, 3 / 5, 10 / 12]}>
              <MediumText> € / day </MediumText>
            </Column>
          </Row>
        </Section>
        <Section>
          <SectionTitle>Set the pick time of your vehicle</SectionTitle>
          <Row width={[1, 1, 1, 2 / 3]}>
            <Column py={2} width={[1, 1 / 2, 1 / 2]}>
              <TimePicker
                name="pick_start_time"
                key="pick_start_time"
                label={'Set initial pick time'}
                value={this.state.pick_start_time}
                error={validation.pick_start_time.message ? 'true' : ''}
                errormessage={validation.pick_start_time.message}
                onChange={value => {
                  this.handlePickerChange({
                    target: {
                      name: 'pick_start_time',
                      value: value ? value.value : ''
                    }
                  });
                }}
              />
            </Column>

            <Column py={2} width={[1, 1 / 2, 1 / 2]}>
              <TimePicker
                name="pick_end_time"
                key="pick_end_time"
                label={'Set end pick time'}
                value={this.state.pick_end_time}
                error={validation.pick_end_time.message ? 'true' : ''}
                errormessage={validation.pick_end_time.message}
                onChange={value => {
                  this.handlePickerChange({
                    target: {
                      name: 'pick_end_time',
                      value: value ? value.value : ''
                    }
                  });
                }}
              />
            </Column>
          </Row>
        </Section>

        <Section>
          <SectionTitle>Set the deliver time of your vehicle</SectionTitle>
          <Row width={[1, 1, 1, 2 / 3]}>
            <Column py={2} width={[1, 1 / 2, 1 / 2]}>
              <TimePicker
                name="deliver_start_time"
                key="deliver_start_time"
                label={'Set initial deliver time'}
                value={this.state.deliver_start_time}
                error={validation.deliver_start_time.message ? 'true' : ''}
                errormessage={validation.deliver_start_time.message}
                onChange={value => {
                  this.handlePickerChange({
                    target: {
                      name: 'deliver_start_time',
                      value: value ? value.value : ''
                    }
                  });
                }}
              />
            </Column>

            <Column py={2} width={[1, 1 / 2, 1 / 2]}>
              <TimePicker
                name="deliver_end_time"
                key="deliver_end_time"
                label={'Set end deliver time'}
                value={this.state.deliver_end_time}
                error={validation.deliver_end_time.message ? 'true' : ''}
                errormessage={validation.deliver_end_time.message}
                onChange={value => {
                  this.handlePickerChange({
                    target: {
                      name: 'deliver_end_time',
                      value: value ? value.value : ''
                    }
                  });
                }}
              />
            </Column>
          </Row>
        </Section>
        <Row width={[1, 2 / 3, 3 / 4, 1 / 3]} my={2}>
          <Column width={1 / 2}>
            <Button onClick={() => this.handleSubmit(this.props.previous)}>Back</Button>
          </Column>
          <Column width={1 / 2}>
            <Button onClick={() => this.handleSubmit(this.props.next)}>Next</Button>
          </Column>
        </Row>
      </div>
    );
  }
}

export default RentalInfo;
