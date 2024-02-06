// components/BankAccountForm.tsx
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import type { FieldProps } from "formik";
import type { BankAccountPayload, User } from "@/models";

const validationSchema = yup.object({
  bankName: yup
    .string()
    .min(5, "Must contain at least 5 characters")
    .required("Enter a bank name"),
  routingNumber: yup
    .string()
    .length(9, "Must contain a valid routing number")
    .required("Enter a valid bank routing number"),
  accountNumber: yup
    .string()
    .min(9, "Must contain at least 9 digits")
    .max(12, "Must contain no more than 12 digits")
    .required("Enter a valid bank account number"),
});

export interface BankAccountFormProps {
  userId: User["id"];
  createBankAccount: (payload: BankAccountPayload) => void;
  onboarding?: boolean;
}

export default function BankAccountForm(props: BankAccountFormProps) {
  const { userId, createBankAccount, onboarding } = props;
  const theme = useTheme();
  const navigate = useNavigate();
  const initialValues: BankAccountPayload = {
    userId,
    bankName: "",
    accountNumber: "",
    routingNumber: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        createBankAccount({ ...values, userId });
        if (!onboarding) {
          navigate("/bankaccounts");
        }
      }}
    >
      {({ isValid, isSubmitting, dirty }) => (
        <Box component={Form} sx={{ width: "100%", mt: theme.spacing(1) }}>
          <Field name="bankName">
            {({
              field,
              meta: { error, initialValue, touched, value },
            }: FieldProps) => (
              <TextField
                id="backaccount-bankName-input"
                type="text"
                required
                placeholder="Bank Name"
                variant="outlined"
                margin="dense"
                fullWidth
                error={(touched || value !== initialValue) && Boolean(error)}
                helperText={touched || value !== initialValue ? error : ""}
                {...field}
              />
            )}
          </Field>
          <Field name="routingNumber">
            {({
              field,
              meta: { error, value, initialValue, touched },
            }: FieldProps) => (
              <TextField
                id="backaccount-routingNumber-input"
                type="text"
                required
                placeholder="Bank Number"
                variant="outlined"
                margin="dense"
                fullWidth
                error={(touched || value !== initialValue) && Boolean(error)}
                helperText={touched || value !== initialValue ? error : ""}
                {...field}
              />
            )}
          </Field>
          <Field name="accountNumber">
            {({
              field,
              meta: { error, value, initialValue, touched },
            }: FieldProps) => (
              <TextField
                id="backaccount-accountNumber-input"
                type="text"
                required
                placeholder="Account Number"
                variant="outlined"
                margin="dense"
                fullWidth
                error={(touched || value !== initialValue) && Boolean(error)}
                helperText={touched || value !== initialValue ? error : ""}
                {...field}
              />
            )}
          </Field>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item>
              <Button
                type="submit"
                disabled={!dirty || !isValid || isSubmitting}
                fullWidth
                variant="contained"
                color="primary"
                sx={{ m: theme.spacing(3, 0, 2) }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Formik>
  );
}
