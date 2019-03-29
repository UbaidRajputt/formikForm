import React from "react";
import { Table } from "reactstrap";

export default class Example extends React.Component {
  render() {
    console.log();
    return (
      <Table bordered dark>
        <thead>
          <tr>
            <th>Number</th>
            <th>Email</th>
            <th>Address</th>
            <th>Password</th>
            <th>Food Item</th>
            <th>Single Datepicker:</th>
            <th>Range Datepicker:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>{this.props.email}</td>
            <td>{this.props.address}</td>
            <td>{this.props.password}</td>
            <td>{this.props.career}</td>
            <td>{this.props.singleDate}</td>
            <td>
              {" "}
              Start date: {this.props.startDate} End Date: {this.props.endDate}
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }
}
