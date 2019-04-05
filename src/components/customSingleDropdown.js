import React, { Component } from "react";
import { Label } from "reactstrap";

class Select extends Component {
  state = {
    incomingValues: ""
  };
  render() {
    return (
      <div>
        <Label for="Select">Choose a food Item</Label>
        <select
          name={this.props.field.name}
          className="form-control"
          onChange={this.someMethod}
        >
          <option value="">Select a value</option>
          {this.props.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.value}
            </option>
          ))}
        </select>
        {!!this.props.error && this.props.touched && (
          <div style={{ color: "red", marginTop: ".5rem" }}>
            {this.props.error}
          </div>
        )}
      </div>
    );
  }
  someMethod = value => {
    if (!(value.target.value === "")) {
      this.setState({ incomingValues: value.target.value });
      this.props.form.setFieldValue("list", value.target.value);
    }
  };
}
export default Select;
