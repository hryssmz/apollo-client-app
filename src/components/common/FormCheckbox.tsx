// components/common/FormCheckbox.tsx
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Field } from "formik";
import type { CheckboxProps } from "@mui/material/Checkbox";
import type { FieldProps } from "formik";

export interface FormCheckboxProps {
  name: string;
  label: string;
  color?: CheckboxProps["color"];
}

export default function FormCheckbox({
  name,
  label,
  color,
}: FormCheckboxProps) {
  return (
    <FormControlLabel
      control={
        <Field name={name}>
          {({ field }: FieldProps) => <Checkbox color={color} {...field} />}
        </Field>
      }
      label={label}
    />
  );
}
