// components/auth/SignInForm.tsx
import { Link } from "react-router-dom";
import { useSelector } from "@xstate/react";
import { useTheme } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Form, Formik } from "formik";
import * as yup from "yup";
import Footer from "../common/Footer";
import FormCheckbox from "../common/FormCheckbox";
import FormTextField from "../common/FormTextField";
import SvgRwaLogo from "../svg/SvgRwaLogo";
import type { AuthActorRef } from "@/machines/authMachine";
import type { MutationLoginArgs } from "@/graphql/graphql";

type FormValues = MutationLoginArgs["payload"] & { remember?: boolean };

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(4, "Password must contain at least 4 characters")
    .required("Enter your password"),
});

export interface SignInFormProps {
  authActor: AuthActorRef;
}

export default function SignInForm({ authActor }: SignInFormProps) {
  const theme = useTheme();
  const authState = useSelector(authActor, state => state);
  const initialValues: FormValues = {
    username: "",
    password: "",
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
        {authState.context.message && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {authState.context.message}
          </Alert>
        )}
        <div>
          <SvgRwaLogo style={{ color: theme.palette.primary.main }} />
        </div>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            authActor.send({ type: "LOGIN", payload: values });
          }}
        >
          {({ isValid, isSubmitting, dirty }) => (
            <Box component={Form} sx={{ width: "100%", mt: 1 }}>
              <FormTextField
                id="username"
                name="username"
                type="text"
                required
                label="Username"
                variant="outlined"
                margin="normal"
                fullWidth
                autoFocus
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
              <FormCheckbox
                name="remember"
                label="Remember me"
                color="primary"
              />
              <Button
                type="submit"
                disabled={!dirty || !isValid || isSubmitting}
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2, mx: 0 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/forgotpassword">Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link to="/signup">Don't have an account? Sign Up</Link>
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
