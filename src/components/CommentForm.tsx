// components/CommentForm.tsx
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import type { FieldProps } from "formik";

const validationSchema = yup.object({
  context: yup.string(),
});

export interface CommentPayload {
  transactionId: string;
  content: string;
}

export interface CommentFormProps {
  transactionId: string;
  transactionComment: (payload: CommentPayload) => void;
}

export default function CommentForm({
  transactionId,
  transactionComment,
}: CommentFormProps) {
  const theme = useTheme();
  const initialValues: { content: string } = { content: "" };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        transactionComment({ transactionId, ...values });
      }}
    >
      <Box
        component={Form}
        sx={{
          mt: theme.spacing(8),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Field name="content">
          {({
            field,
            meta: { error, initialValue, touched, value },
          }: FieldProps) => (
            <TextField
              id={`transaction-comment-input-${transactionId}`}
              type="text"
              placeholder="Write a comment..."
              variant="outlined"
              margin="dense"
              fullWidth
              error={(touched || value !== initialValue) && Boolean(error)}
              helperText={touched || value !== initialValue ? error : ""}
              {...field}
            />
          )}
        </Field>
      </Box>
    </Formik>
  );
}
