import React, { Component } from "react";
import { DateRangePicker } from "react-dates";
import moment from "moment";
import isInclusivelyAfterDay from "moment";
import idLocale from "moment/locale/id";
import esLocale from "moment/locale/es";

class RangeDater extends Component {
  constructor(props) {
    super(props);
    this.range(1900, 2019);
  }
  state = {
    startDate: null,
    focused: null,
    endDate: null,
    yearArr: [],
    langSelection: "",
    startTrans: "Start Date",
    endTrans: "End Date"
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
            <option key={item}>{item}</option>
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
        <DateRangePicker
          startDatePlaceholderText={this.state.startTrans}
          endDatePlaceholderText={this.state.endTrans}
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
        <select onChange={this.someMethod}>
          <option value="Date">select an option</option>
          <option value="Tanggal">Indonesian</option>
          <option value="Fecha">Spanish</option>
        </select>
      </div>
    );
  }
  someMethod = e => {
    this.setState({ langSelection: e.target.value }, () => {});
    if (e.target.value === "Date") {
      this.setState({ startTrans: "Start Date" });
      this.setState({ endTrans: "End Date" });
    } else if (e.target.value === "Tanggal") {
      this.setState({ startTrans: "mulai tanggal" });
      this.setState({ endTrans: "tanggal akhir" });
    } else if (e.target.value === "Fecha") {
      this.setState({ startTrans: "fecha de inicio" });
      this.setState({ endTrans: "fecha final" });
    }
  };
}

export default RangeDater;
