import React, { Component } from "react";
import { withFormik, Field, Form } from "formik";
import { customInputForm } from "./customInputs";
import * as Yup from "yup";
import SingleDater from "./singleDatePicker";
import Select from "./customSingleDropdown";
import RangeDater from "./customRangeDatePicker";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import CustomMultipleSelect from "./customMultipeSelect";
import Image from "./imageUploader";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PhoneNumber from "./PhoneNumbers";
import { FormGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Prompt } from "react-router-dom";

const styles = {
  color: "red",
  fontSize: "15px"
};

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

const multipleOptions = [
  { value: "Food", label: "Food" },
  { value: "Being Fabulous", label: "Being Fabulous" },
  { value: "Ken Wheeler", label: "Ken Wheeler" },
  { value: "ReasonML", label: "ReasonML" },
  { value: "Unicorns", label: "Unicorns" },
  { value: "Kittens", label: "Kittens" }
];

var strongPassRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

var strongNameRegex = new RegExp("^[A-Za-z]+$");
function getValidationSchema(values) {
  return Yup.object().shape({
    email: Yup.string()
      .email("E-mail is not valid!")
      .required("Required!"),
    password: Yup.string()
      .matches(strongPassRegex, "Password is NOT strong")
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    name: Yup.string()
      .matches(
        strongNameRegex,
        "Not a valid Name, remove special characters/spaces"
      )
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    list: Yup.string().required("Required"),
    singledatepicker: Yup.date().required("Required"),
    startDate: Yup.date().required("Required"),
    endDate: Yup.date().required("Required"),
    renternewpass: Yup.string()
      .matches(strongPassRegex, "Password is NOT strong")
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    newpass: Yup.string()
      .matches(strongPassRegex, "Password is NOT strong")
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    oldpass: Yup.string()
      .matches(strongPassRegex, "Password is NOT strong")
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    topics: Yup.array()
      .min(3, "Pick at least 3 tags")
      .of(
        Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required()
        })
      )
  });
}

function getErrorsFromValidationError(validationError) {
  const FIRST_ERROR = 0;
  return validationError.inner.reduce((errors, error) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR]
    };
  }, {});
}

class MyForm extends Component {
  state = {
    modal: false,
    passwordsMatch: false,
    disabled: false,
    divDisabled: false,
    popupFieldDisabled: false,
    showComponent: false,
    modalTwo: false,
    showSweetError: false,
    isBlocking: false
  };
  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    this.setState({ disabled: true });
  };
  toggleTwo = () => {
    this.setState(prevState => ({
      modalTwo: !prevState.modalTwo
    }));
  };
  someMethod = e => {
    if (e.target.value.length > 0) {
      this.setState({ isBlocking: true });
    }
    if (e.target.value.length === 0) {
      this.setState({ isBlocking: false });
    }
  };
  render() {
    let { isBlocking } = this.state;
    const {
      handleSubmit,
      values,
      setFieldValue,
      touched,
      errors,
      setFieldTouched,
      dirty
    } = this.props;

    if (
      values.password === values.oldpass &&
      values.newpass !== "" &&
      values.newpass === values.renternewpass
    ) {
      values.password = values.newpass;
      this.setState({ disabled: false });
      this.setState({ divDisabled: false });
    }
    return (
      <div>
        <Prompt when={isBlocking} message="Are you sure?" />
        <Form onSubmit={handleSubmit} onChange={this.someMethod}>
          <h1>Formik Form</h1>
          <FormGroup>
            <Field
              name="email"
              placeholder="Email Address"
              type={"email"}
              component={customInputForm}
            />
            {errors.email && touched.email && (
              <div style={styles}>{errors.email}</div>
            )}
          </FormGroup>
          <FormGroup>
            <Field
              name="name"
              placeholder="Name"
              type={"text"}
              component={customInputForm}
            />
            {errors.name && touched.name && (
              <div style={styles}>{errors.name}</div>
            )}
          </FormGroup>
          <FormGroup>
            <Field
              name="password"
              placeholder="Password"
              type={"password"}
              component={customInputForm}
            />
            {errors.password && touched.password && (
              <div style={styles}>{errors.password}</div>
            )}
          </FormGroup>
          <FormGroup>
            <Field name="list" options={options} component={Select} />
            {errors.list && touched.list && (
              <div style={styles}>{errors.list}</div>
            )}
          </FormGroup>
          <FormGroup>
            <Field
              name="topics"
              value={values.topics}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.topics}
              touched={touched.topics}
              options={multipleOptions}
              component={CustomMultipleSelect}
            />
          </FormGroup>
          <FormGroup>
            <Field name="singledatepicker" component={SingleDater} />
            {errors.singledatepicker && touched.singledatepicker && (
              <div style={styles}>{errors.singledatepicker}</div>
            )}
          </FormGroup>
          <FormGroup>
            <Field name="rangedatepicker" component={RangeDater} />
            {errors.startDate && touched.startDate && (
              <div style={styles}>{errors.startDate}</div>
            )}
            {errors.endDate && touched.endDate && (
              <div style={styles}>{errors.endDate}</div>
            )}
          </FormGroup>
          <FormGroup>
            <Button outline color="primary" onClick={this.toggle}>
              Reset Password
            </Button>{" "}
            {this.state.modal === true ? (
              <Modal isOpen={this.state.modal}>
                <ModalHeader>Password Reset</ModalHeader>
                <ModalBody>
                  <FormGroup>
                    <Field
                      name="oldpass"
                      placeholder="Enter old password"
                      type={"password"}
                      component={customInputForm}
                    />
                    {errors.oldpass && touched.oldpass && (
                      <div style={styles}>{errors.oldpass}</div>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Field
                      name="newpass"
                      placeholder="New Password"
                      type={"password"}
                      component={customInputForm}
                    />
                    {errors.newpass && touched.newpass && (
                      <div style={styles}>{errors.newpass}</div>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Field
                      name="renternewpass"
                      placeholder="Re-enter Password"
                      type={"password"}
                      component={customInputForm}
                    />
                    {errors.renternewpass && touched.renternewpass && (
                      <div style={styles}>{errors.renternewpass}</div>
                    )}
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button
                    type="button"
                    onClick={this.toggle}
                    disabled={this.state.disabled}
                    color="danger"
                  >
                    Reset
                  </Button>{" "}
                  <Button type="button" onClick={this.toggle} color="danger">
                    Cancel Popup
                  </Button>{" "}
                  <hr />
                  {values.newpass === values.renternewpass ? null : (
                    <div style={styles}>Passwords Don't match</div>
                  )}
                </ModalFooter>
              </Modal>
            ) : (
              <div />
            )}
          </FormGroup>
          <FormGroup>
            <Button onClick={this.toggleTwo}>Add Phone Numbers</Button>
            {this.state.modalTwo === true ? (
              <Modal isOpen={this.state.modalTwo} toggle={this.toggleTwo}>
                <ModalHeader>Add Phone Numbers</ModalHeader>
                <ModalBody>
                  <FormGroup>
                    <Field name="PhoneNumbers" component={PhoneNumber} />
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.toggleTwo}>
                    Close
                  </Button>{" "}
                </ModalFooter>
              </Modal>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Image />
          </FormGroup>
          <FormGroup>
            <Button type="submit" size="lg" color="success">
              Submit
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
const MyEnhancedForm = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: "",
    name: "",
    singledatepicker: null,
    list: "",
    startDate: null,
    endDate: null,
    renternewpass: "",
    newpass: "",
    oldpass: "",
    topics: [],
    PhoneNumbers: [
      {
        New: "",
        Recheck: ""
      }
    ]
  }),

  // Custom sync validation
  validate: values => {
    const validationSchema = getValidationSchema(values);
    try {
      validationSchema.validateSync(values, { abortEarly: false });

      return {};
    } catch (error) {
      return getErrorsFromValidationError(error);
    }
  },
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      this.setState({
        isBlocking: false
      });
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: "BasicForm"
})(MyForm);

export default MyEnhancedForm;
