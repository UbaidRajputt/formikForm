import React, { Component } from "react";
import { SingleDatePicker } from "react-dates";
import moment from "moment";
import isInclusivelyAfterDay from "moment";
import idLocale from "moment/locale/id";
import esLocale from "moment/locale/es";

class SingleDater extends Component {
  constructor(props) {
    super(props);
    this.someMethod = this.someMethod.bind(this);
    this.range(1900, 2019);
  }
  state = {
    date: null,
    focused: null,
    yearArr: [],
    langSelection: "Date"
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
            <option key={value} value={value}>
              {label}
            </option>
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
    if (this.state.langSelection === "Tanggal") {
      moment.updateLocale("id", idLocale);
    } else if (this.state.langSelection === "Fecha") {
      moment.updateLocale("es", esLocale);
    } else {
      moment.locale("en");
    }
    return (
      <div>
        <SingleDatePicker
          placeholder={this.state.langSelection}
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
        <select onChange={this.someMethod}>
          <option value="Date">select an option</option>
          <option value="Tanggal">Indonesian</option>
          <option value="Fecha">Spanish</option>
        </select>
      </div>
    );
  }
  someMethod(e) {
    this.setState({ langSelection: e.target.value }, () => {
    });
  }
}

export default SingleDater;
