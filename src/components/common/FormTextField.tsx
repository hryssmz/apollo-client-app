// components/common/FormTextField.tsx
import TextField from "@mui/material/TextField";
import { Field } from "formik";
import { TextFieldProps } from "@mui/material/TextField";
import type { FieldProps } from "formik";

export type FormTextFieldProps = TextFieldProps & {
  id: string;
  name: string;
};

export default function FormTextField({
  id,
  name,
  ...props
}: FormTextFieldProps) {
  return (
    <Field name={name}>
      {({
        field,
        meta: { error, value, initialValue, touched },
      }: FieldProps) => (
        <TextField
          id={id}
          {...props}
          error={(touched || value !== initialValue) && Boolean(error)}
          helperText={touched || value !== initialValue ? error : ""}
          {...field}
        />
      )}
    </Field>
  );
}
