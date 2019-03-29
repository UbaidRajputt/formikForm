import React, { Component } from "react";
import { DateRangePicker } from "react-dates";
import moment from "moment";
import isInclusivelyAfterDay from "moment";

class RangeDater extends Component {
  constructor(props) {
    super(props);
    this.range(1900, 2019);
  }
  state = {
    startDate: null,
    focused: null,
    endDate: null,
    yearArr: []
  };
  range(start, end) {
    for (let i = start; i <= end; i++) {
      this.state.yearArr.push(i);
    }
  }
  renderMonthElement = ({ month, onMonthSelect, onYearSelect }) => (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <select
          value={month.month()}
          onChange={e => onMonthSelect(month, e.target.value)}
        >
          {moment.months().map((label, value) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>
      <div>
        <select
          value={month.year()}
          onChange={e => onYearSelect(month, e.target.value)}
        >
          {this.state.yearArr.map(item => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
    </div>
  );

  render() {
    return (
      <div>
        <DateRangePicker
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) => {
            this.props.form.setFieldValue("startDate", startDate);
            this.props.form.setFieldValue("endDate", endDate);
            this.setState({ startDate: startDate, endDate: endDate });
          }} // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          renderMonthElement={this.renderMonthElement}
          isOutsideRange={day => !isInclusivelyAfterDay(day, moment())}
          numberOfMonths={1}
        />
      </div>
    );
  }
}

export default RangeDater;