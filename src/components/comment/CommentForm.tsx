// components/comment/CommentForm.tsx
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Form, Formik } from "formik";
import * as yup from "yup";
import FormTextField from "../common/FormTextField";
import type { MutationCreateCommentArgs } from "@/graphql/graphql";

type FormValues = Pick<MutationCreateCommentArgs["payload"], "content">;

const validationSchema = yup.object({
  content: yup.string(),
});

export interface CommentPayload {
  transactionId: string;
  content: string;
}

export interface CommentFormProps {
  transactionId: string;
  transactionComment: (payload: MutationCreateCommentArgs["payload"]) => void;
}

export default function CommentForm({
  transactionId,
  transactionComment,
}: CommentFormProps) {
  const theme = useTheme();
  const initialValues: FormValues = { content: "" };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        transactionComment({ transactionId, ...values, userId: "" });
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
        <FormTextField
          id={`transaction-comment-input-${transactionId}`}
          name="content"
          type="text"
          placeholder="Write a comment..."
          variant="outlined"
          margin="dense"
          fullWidth
        />
      </Box>
    </Formik>
  );
}
