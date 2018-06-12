import React, { Component } from 'react';
import { Box, Checkbox, Label } from 'rebass';
import { Range } from 'rc-slider';
import { Section } from './ui/Section';
import { SmallText, MediumText } from './ui/Typography';
import 'rc-slider/assets/index.css';

import theme from '../styles/theme';

export class RangeFilter extends Component {
  state = {
    values: this.props.defaultValue || [0, 0]
  };

  rangeChanged = values => this.setState({ values });

  render() {
    const units = this.props.units || '';

    return (
      <FilterWrapper title={this.props.name}>
        <Box mb={10}>
          From <strong>{`${this.state.values[0]} ${units}`}</strong> to{' '}
          <strong>{`${this.state.values[1]} ${units}`}</strong>
        </Box>
        <Range
          {...this.props}
          allowCross={false}
          defaultValue={this.state.values}
          onChange={this.rangeChanged}
          onAfterChange={this.props.onChange}
          trackStyle={[{ backgroundColor: theme.colors.rangeTrack }]}
          handleStyle={[
            {
              backgroundColor: theme.colors.rangeHandle,
              borderColor: theme.colors.rangeHandleBorder
            },
            {
              backgroundColor: theme.colors.rangeHandle,
              borderColor: theme.colors.rangeHandleBorder
            }
          ]}
        />
      </FilterWrapper>
    );
  }
}

export class ListFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props.list || []
    };
  }

  componentWillReceiveProps = props => {
    this.setState(props);
  };

  selectionChanged = (index, event) => {
    const list = this.state.list;
    list[index].checked = event.target.checked;
    this.setState({ list });

    this.props.onChange(list.filter(elem => elem.checked).map(elem => elem.value));
  };

  render() {
    return (
      <FilterWrapper title={this.props.name}>
        {this.state.list.map((elem, i) => (
          <Label key={i}>
            <Checkbox
              checked={elem.checked || false}
              onChange={event => this.selectionChanged(i, event)}
            />
            {elem.label}
          </Label>
        ))}
      </FilterWrapper>
    );
  }
}

const FilterWrapper = ({ title, children }) => (
  <div>
    <MediumText fontWeight="bold">{title}</MediumText>
    <Section>
      <SmallText>{children}</SmallText>
    </Section>
  </div>
);
