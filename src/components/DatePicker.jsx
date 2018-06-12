import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import LocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';

const dayPickerSharedProps = {
  numberOfMonths: 1,
  locale: 'en',
  localeUtils: LocaleUtils
};

class DatePicker extends Component {
  handleDayChange = date => {
    this.props.onChange(date);
  };

  render() {
    return (
      <DayPickerInput
        format="LL"
        formatDate={formatDate}
        parseDate={parseDate}
        dayPickerProps={dayPickerSharedProps}
        ref={this.props.dayPickerRef}
        {...this.props}
        onDayChange={this.handleDayChange}
      />
    );
  }
}

export default DatePicker;
