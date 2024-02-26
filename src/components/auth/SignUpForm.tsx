// components/auth/SignUpForm.tsx
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Form, Formik } from "formik";
import * as yup from "yup";
import Footer from "../common/Footer";
import FormTextField from "../common/FormTextField";
import SvgRwaLogo from "../svg/SvgRwaLogo";
import type { AuthActorRef } from "@/machines/authMachine";
import type { MutationCreateUserArgs } from "@/graphql/graphql";

type FormValues = MutationCreateUserArgs["payload"] & {
  confirmPassword: MutationCreateUserArgs["payload"]["password"];
};

const validationSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(4, "Password must contain at least 4 characters")
    .required("Enter your password"),
  confirmPassword: yup
    .string()
    .required("Confirm your password")
    .oneOf([yup.ref("password")], "Password does not match"),
});

export interface SignUpFormProps {
  authActor: AuthActorRef;
}

export default function SignUpForm({ authActor }: SignUpFormProps) {
  const theme = useTheme();
  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <SvgRwaLogo style={{ color: theme.palette.primary.main }} />
        </div>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            authActor.send({ type: "SIGNUP", payload: values });
          }}
        >
          {({ isValid, isSubmitting, dirty }) => (
            <Box component={Form} sx={{ width: "100%", mt: 1 }}>
              <FormTextField
                id="firstName"
                name="firstName"
                type="text"
                required
                label="First Name"
                variant="outlined"
                margin="normal"
                fullWidth
                autoFocus
              />
              <FormTextField
                id="lastName"
                name="lastName"
                type="text"
                required
                label="Last Name"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <FormTextField
                id="username"
                name="username"
                type="text"
                required
                label="Username"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <FormTextField
                id="password"
                name="password"
                type="password"
                required
                label="Password"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <FormTextField
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                label="Confirm Password"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <Button
                type="submit"
                disabled={!dirty || !isValid || isSubmitting}
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2, mx: 0 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/signin">Have an account? Sign In</Link>
                </Grid>
              </Grid>
            </Box>
          )}
        </Formik>
      </Box>
      <Box sx={{ mt: 8 }}>
        <Footer />
      </Box>
    </Container>
  );
}
