import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVehicleTypeFeatures } from '../../../redux/selectors/vehicle-type-selector';

import {
  Title,
  SectionTitle,
  Row,
  Column,
  Section,
  TextArea,
  NoteText,
  MediumText,
  Input,
  Button
} from '../../ui';
import { Flex } from 'rebass';
import FormValidator from '../../../validations/FormValidator';
import { descriptionStepValidations } from '../../../validations/DataValidations';

class Description extends Component {
  constructor(props) {
    super(props);
    const data = props.values;

    this.validator = new FormValidator(descriptionStepValidations);

    this.state = {
      description: data ? data.description : '',
      features: data ? data.features : {},
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

  handleTextAreaChange = event => {
    this.setState({
      description: event ? event.target.value : ''
    });
  };

  handleFeaturesTextChange = event => {
    const features = this.state.features;
    features[event.target.name] = event ? event.target.value : '';
    this.setState({
      features
    });
  };

  handleFeaturesCheckBoxChange = event => {
    const checks = this.state.features;
    checks[event.target.name] = checks[event.target.name]
      ? !checks[event.target.name]
      : true;
    this.setState({
      features: checks
    });
  };

  buildFeaturesColumns = (feature, index) => {
    return (
      <Column key={index} py={2} width={[1, 1, 1 / 2, 1 / 3]}>
        <Flex align="center">
          <MediumText pr={1}>{feature.name}: </MediumText>
          <Input
            key={feature.name}
            name={feature.pivot.feature_id}
            border="true"
            type="text"
            defaultValue={this.state.features[feature.name]}
            onChange={this.handleFeaturesTextChange}
          />
        </Flex>
      </Column>
    );
  };

  buildFeaturesCheckboxColumns = (feature, index) => {
    return (
      <Column key={index} width={[1 / 2, 1 / 3, 1 / 3]} py={2}>
        <Flex align="center">
          <input
            name={feature.pivot.feature_id}
            onChange={this.handleFeaturesCheckBoxChange}
            defaultChecked={this.state.features[feature.name]}
            type="checkbox"
          />
          <MediumText pl={1}>{feature.name}</MediumText>
        </Flex>
      </Column>
    );
  };

  BuildFeatures = features => {
    let countCheckboxFeatures = 0;
    let countFeatures = 0;
    return (
      <Section>
        {features.map((feature, index) => {
          if (feature.data_type !== 'boolean') {
            if (countFeatures === 0) {
              countFeatures++;
              return (
                <div key={index}>
                  <SectionTitle>Vehicle features</SectionTitle>
                  <Row py={3}>{this.buildFeaturesColumns(feature, index)}</Row>
                </div>
              );
            } else {
              return <div> {this.buildFeaturesColumns(feature, index)}</div>;
            }
          }
          if (countCheckboxFeatures === 0) {
            countCheckboxFeatures++;
            return (
              <div key={index}>
                <SectionTitle>Other features</SectionTitle>
                <Row py={3}>{this.buildFeaturesCheckboxColumns(feature, index)}</Row>
              </div>
            );
          } else {
            return <div>{this.buildFeaturesCheckboxColumns(feature, index)}</div>;
          }
        })}
      </Section>
    );
  };

  render() {
    let validation = this.submitted // if the form has been submitted at least\ once
      ? this.validator.validate(this.state) // then check validity every time we render
      : this.state.validation;

    return (
      <div>
        <Title fontWeight={'normal'}>We need to know the details</Title>
        <Section>
          <SectionTitle>Vehicle description</SectionTitle>
          <Row py={3}>
            <Column width={[1]}>
              <TextArea
                name="description"
                border="true"
                rows="5"
                type="text"
                label="A detailed description will help you rent more"
                error={validation.description.message ? 'true' : ''}
                errormessage={validation.description.message}
                defaultValue={this.state.description}
                onChange={this.handleTextAreaChange}
              />

              <NoteText ml={2}>
                No need to include your contact info; travelers will receive it once
                you’ve confirmed their trip.
              </NoteText>
            </Column>
          </Row>
        </Section>
        {this.BuildFeatures(this.props.vehicleTypeFeatures)}
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

const mapStateToProps = (reduxState, props) => ({
  vehicleTypeFeatures: getVehicleTypeFeatures(reduxState, {
    id: props.customProps.vehicleType
  })
});

export default connect(mapStateToProps)(Description);
