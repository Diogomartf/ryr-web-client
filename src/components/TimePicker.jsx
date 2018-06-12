import React, { Component } from 'react';
import { Select } from './ui';

class TimePicker extends Component {
  buildPickTimeValues = value => {
    var values = [];
    for (value; value < 24; value++) {
      if (value < 10) {
        values.push({ value: '0' + value + ':00', label: '0' + value + ':00' });
        values.push({ value: '0' + value + ':30', label: '0' + value + ':30' });
      } else {
        values.push({ value: value + ':00', label: value + ':00' });
        values.push({ value: value + ':30', label: value + ':30' });
      }
    }
    return values;
  };

  render() {
    return (
      <div>
        <Select
          name={this.props.name}
          key={this.props.name}
          value={this.props.value}
          label={this.props.label}
          options={this.buildPickTimeValues(this.props.begin ? this.props.begin : 0)}
          errormessage={this.props.errormessage}
          error={this.props.error}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}
export default TimePicker;
