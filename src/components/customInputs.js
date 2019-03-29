import React from "react";
import { Input } from "reactstrap";

export const customInputForm = ({
  field,
  form: { touched, errors },
  ...props
}) => (
  <div>
    <Input
      invalid={!!(touched[field.name] && errors[field.name])}
      {...field}
      {...props}
    />
  </div>
);
