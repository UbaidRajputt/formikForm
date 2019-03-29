import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Container, Row, Col, FormGroup, Alert } from "react-bootstrap";
import { customInputForm } from "./customInputs";
import Select from "./customSingleDropdown";
import SingleDater from "./singleDatePicker";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import RangeDater from "./customRangeDatePicker";
import TableView from "./TableView";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];
var strongRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
const SignupSchema = Yup.object().shape({
  address: Yup.string()
    .min(10, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  career: Yup.string()
    .required("Required")
    .min(0, "Too short"),
  singledatepicker: Yup.date().required("Select a date!!!!"),
  startDate: Yup.date().required("Required"),
  endDate: Yup.date().required("Required"),
  NewPass: Yup.string()
    .matches(strongRegex, "Password is NOT strong")
    .required("Required")
    .min(8, "Too Short!")
    .max(50, "Too Long!"),
  RenterNewPass: Yup.string()
    .matches(strongRegex, "Password is NOT strong")
    .required("Required")
});
class MainForm extends Component {
  state = {
    email: "",
    address: "",
    password: "",
    career: "",
    singleDate: "",
    startDate: "",
    endDate: "",
    open: false,
    date: null,
    disableSubmit: false,
    modal: false,
    PassMatch: false
  };
  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };
  toggleClose = () => {
    this.toggle();
  };
  render() {
    return (
      <Container>
        <div>
          <Row>
            <Col>
              <h1> Formik Form Validations </h1>
            </Col>
          </Row>
          <Row>
            <Col />{" "}
          </Row>
        </div>
        <Row>
          <Col>
            <Formik
              initialValues={{
                email: "",
                address: "",
                password: "",
                career: "",
                singledatepicker: null,
                startDate: null,
                endDate: null,
                RenterNewPass: "",
                NewPass: ""
              }}
              validationSchema={SignupSchema}
              onSubmit={values => {
                this.setState({ data: values });
                this.setState({ disableSubmit: true });
                this.setState({ open: true });
                this.setState({ email: values.email });
                this.setState({ address: values.address });
                this.setState({ password: values.password });
                this.setState({ career: values.career });
                this.setState({
                  singleDate: values.singledatepicker.toString()
                });
                this.setState({ startDate: values.startDate.toString() });
                this.setState({ endDate: values.endDate.toString() });
                console.log(values.NewPass);
                console.log(values.RenterNewPass);
                if (values.NewPass === values.RenterNewPass) {
                  this.setState({ password: values.NewPass });
                  this.setState({PassMatch:true});
                }else if(!(values.NewPass === values.RenterNewPass)){
                  this.setState({PassMatch:false});
                }
                console.log("Password Set To", this.state.password);
              }}
            >
              <Form>
                <FormGroup>
                  <Field
                    name="email"
                    placeholder="Email Address"
                    type={"email"}
                    component={customInputForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    name="address"
                    placeholder="Enter Address"
                    type={"text"}
                    component={customInputForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    name="password"
                    placeholder="Password"
                    type={"password"}
                    component={customInputForm}
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    name="career"
                    label={"List"}
                    options={options}
                    component={Select}
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    name="singledatepicker"
                    component={SingleDater}
                  />
                </FormGroup>
                <FormGroup>
                  <Field
                    name="rangedatepicker"
                    component={RangeDater}
                  />
                  
                </FormGroup>
                <FormGroup>
                  <Button outline color="primary" onClick={this.toggle}>
                    Reset Password
                  </Button>{" "}
                </FormGroup>
                <FormGroup>
                  <Button type="submit" size="lg" color="success">
                    Submit
                  </Button>
                </FormGroup>
                <div>
                  {this.state.modal === true ? (
                    <Modal isOpen={this.state.modal}>
                      <ModalHeader>Password Reset</ModalHeader>
                      <ModalBody>
                        <Field
                          name="NewPass"
                          placeholder="New Password"
                          type={"password"}
                          component={customInputForm}
                        />
                        <hr />
                        <Field
                          name="RenterNewPass"
                          placeholder="Re-enter Password"
                          type={"password"}
                          component={customInputForm}
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          type="button"
                          onClick={this.toggleClose}
                          color="danger"
                        >
                          Reset
                        </Button>{" "}
                        {this.state.PassMatch === true ? (
                          <Alert>Passwords Match</Alert>
                        ) : (
                          <Alert>Passwords ddd Match</Alert>
                        )}
                      </ModalFooter>
                    </Modal>
                  ) : (
                    <div />
                  )}
                </div>
              </Form>
            </Formik>
          </Col>
          <Col>
            {" "}
            {this.state.open === true &&
            !(this.state.data === null) &&
            this.state.disableSubmit === true ? (
              <TableView
                email={this.state.email}
                address={this.state.address}
                password={this.state.password}
                career={this.state.career}
                singleDate={this.state.singleDate}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
              />
            ) : (
              <div />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
export default MainForm;
