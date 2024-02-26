// components/bank-account/BankAccountForm.tsx
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Form, Formik } from "formik";
import * as yup from "yup";
import FormTextField from "../common/FormTextField";
import type { MutationCreateBankAccountArgs, User } from "@/graphql/graphql";

type FormValues = MutationCreateBankAccountArgs["payload"];

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
  createBankAccount: (payload: FormValues) => void;
  onboarding?: boolean;
}

export default function BankAccountForm({
  userId,
  createBankAccount,
  onboarding,
}: BankAccountFormProps) {
  const navigate = useNavigate();
  const initialValues: FormValues = {
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
        <Box component={Form} sx={{ width: "100%", mt: 1 }}>
          <FormTextField
            id="backaccount-bankName-input"
            name="bankName"
            type="text"
            required
            placeholder="Bank Name"
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <FormTextField
            id="backaccount-routingNumber-input"
            name="routingNumber"
            type="text"
            required
            placeholder="Bank Number"
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <FormTextField
            id="backaccount-accountNumber-input"
            name="accountNumber"
            type="text"
            required
            placeholder="Account Number"
            variant="outlined"
            margin="dense"
            fullWidth
          />
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
                sx={{ mt: 3, mb: 2, mx: 0 }}
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
