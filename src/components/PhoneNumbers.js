import React, { Component } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

Yup.addMethod(Yup.object, 'uniqueProperty', function (propertyName, message) {
  return this.test('unique', message, function (value) {
    console.log('propert values is :',value[propertyName]);
    if (!value || !value[propertyName]) {
      
      return true;
    }

    const { path } = this;
    const options = [...this.parent];
    const currentIndex = options.indexOf(value);

    const subOptions = options.slice(0, currentIndex);

    if (subOptions.some((option) => option[propertyName] === value[propertyName])) {
      throw this.createError({
        path: `${path}.${propertyName}`,
        message,
      });
    }

    return true;
  });
});
const schema = Yup.object().shape({
  phoneNumbers: Yup.array()
  .of(
      Yup.object().shape({
        New: Yup.string()
          .min(7, "too short")
          .max(15, "Too long")
          .required("Required")
          ,
        Recheck: Yup.string()
          .oneOf([Yup.ref("New"), null], "Numbers dont match")
          .required("Required")
          .min(7, "too short")
          .max(15, "Too long")
      }).uniqueProperty('New','Number Alreay exists')
    )
    .required("Must have Phone Number") // these constraints are shown if and only if inner constraints are satisfie
    .min(1, "Minimum of 1 Phone Numbers")
    .max(5, "Maximum of 5 Phone Numbers") 
})
class PhoneNumber extends Component {
  state = {
    error: false
  };
  stopPopulating = () => {};

  render() {
    return (
      <div>
        <h1>Friend List</h1>
        <Formik
          initialValues={{ phoneNumbers: [{ New: "", Recheck: "" }] }}
          onSubmit={values =>
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
            }, 500)
          }
          validationSchema={schema}
          render={({ values,errors }) => (
            
            <Form>
              <FieldArray
                name="phoneNumbers"
                render={arrayHelpers => (
                  <div>
                    {values.phoneNumbers.map((Phone, index) => (
                      <div key={index}>
                        <Field
                          name={`phoneNumbers[${index}].New`}
                          type="number"
                        />
                        <ErrorMessage name={`phoneNumbers[${index}].New`} />
                        <Field
                          name={`phoneNumbers[${index}].Recheck`}
                          type="number"
                        />
                        <ErrorMessage name={`phoneNumbers.${index}.Recheck`} />
                        
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          -
                        </button>
                        {console.log(errors)}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({ New: "", Recheck: "" })
                      }
                    >
                      +
                    </button>
                    <button type="submit">Submit</button>
                  </div>
                )}
              />
            </Form>
          )}
        />
      </div>
    );
  }
}

export default PhoneNumber;
