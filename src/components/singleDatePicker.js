import React, { Component } from "react";
import { SingleDatePicker } from "react-dates";
import moment from "moment";
import isInclusivelyAfterDay from "moment";

class SingleDater extends Component {
  constructor(props) {
    super(props);
    this.range(1900, 2019);
  }
  state = {
    date: null,
    focused: null,
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
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  render() {
    return (
      <div>
        <SingleDatePicker
          id={this.props.field.name} // momentPropTypes.momentObj or null
          date={this.state.date}
          onDateChange={date => {
            this.props.form.setFieldValue("singledatepicker", date);
            this.setState({ date: date });
          }} // PropTypes.func.isRequired
          focused={this.state.focused} // PropTypes.bool
          onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
          numberOfMonths={1}
          renderMonthElement={this.renderMonthElement}
          isOutsideRange={day => !isInclusivelyAfterDay(day, moment())}
        />
      </div>
    );
  }
}

export default SingleDater;