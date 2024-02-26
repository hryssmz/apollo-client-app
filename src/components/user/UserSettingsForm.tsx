// components/user/UserSettingsForm.tsx
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Form, Formik } from "formik";
import * as yup from "yup";
import FormTextField from "../common/FormTextField";
import type { MutationUpdateUserArgs, User } from "@/graphql/graphql";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const DefaultPrivacyLevelValues = ["public", "contacts", "private"] as const;

type FormValues = Pick<
  MutationUpdateUserArgs["payload"],
  "firstName" | "lastName" | "email" | "phoneNumber" | "defaultPrivacyLevel"
>;

const validationSchema = yup.object({
  firstName: yup.string().required("Enter a first name"),
  lastName: yup.string().required("Enter a last name"),
  email: yup
    .string()
    .email("Must contain a valid email address")
    .required("Enter an email address"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Enter a phone number"),
  defaultPrivacyLevel: yup.string().oneOf(DefaultPrivacyLevelValues),
});

export interface UserSettingsFormProps {
  user: User;
  updateUser: (payload: MutationUpdateUserArgs["payload"]) => void;
}

export default function UserSettingsForm({
  user,
  updateUser,
}: UserSettingsFormProps) {
  const initialValues: FormValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    defaultPrivacyLevel: user.defaultPrivacyLevel,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        updateUser({ id: user.id, ...values });
        setSubmitting(false);
      }}
    >
      {({ isValid, isSubmitting, dirty }) => (
        <Box component={Form} sx={{ width: "100%", mt: 1 }}>
          <FormTextField
            id="user-settings-firstName-input"
            name="firstName"
            type="text"
            required
            placeholder="First Name"
            variant="outlined"
            margin="normal"
            fullWidth
            autoFocus
          />
          <FormTextField
            id="user-settings-lastName-input"
            name="lastName"
            type="text"
            required
            placeholder="Last Name"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <FormTextField
            id="user-settings-email-input"
            name="email"
            type="text"
            required
            placeholder="Email"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <FormTextField
            id="user-settings-phoneNumber-input"
            name="phoneNumber"
            type="text"
            required
            placeholder="Phone Number"
            variant="outlined"
            margin="normal"
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
                fullWidth
                variant="contained"
                color="primary"
                disabled={!isValid || isSubmitting || !dirty}
                sx={{ mx: 0, mt: 3, mb: 2 }}
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
