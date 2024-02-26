// components/transaction/create/TransactionCreateStepTwo.tsx
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Form, Formik } from "formik";
import * as yup from "yup";
import FormTextField from "@/components/common/FormTextField";
import type { AlertColor } from "@mui/material/Alert";
import type { MutationCreateTransactionArgs, User } from "@/graphql/graphql";

type FormValues = Record<
  "amount" | "description" | "senderId" | "receiverId",
  string
>;

const validationSchema = yup.object({
  amount: yup.number().required("Please enter a valid amount"),
  description: yup.string().required("Please enter a note"),
  senderId: yup.string(),
  receiverId: yup.string(),
});

export interface TransactionCreateStepTwoProps {
  receiver: User;
  sender: User;
  createTransaction: (
    payload: Pick<
      MutationCreateTransactionArgs["payload"],
      "amount" | "description" | "senderId" | "receiverId"
    >,
    transactionType: "request" | "payment"
  ) => void;
  showSnackbar: (payload: { severity: AlertColor; message: string }) => void;
}

export default function TransactionCreateStepTwo({
  receiver,
  sender,
  createTransaction,
  showSnackbar,
}: TransactionCreateStepTwoProps) {
  const [transactionType, setTransactionType] = useState<"request" | "payment">(
    "request"
  );
  const initialValues: FormValues = {
    amount: "",
    description: "",
    senderId: sender.id,
    receiverId: receiver.id,
  };

  return (
    <Paper
      elevation={0}
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box
        display="flex"
        height={200}
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item>
            <Avatar src={receiver.avatar ?? undefined} />
          </Grid>
          <Grid item>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              {receiver.firstName} {receiver.lastName}
              {transactionType}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Container maxWidth="xs">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            createTransaction(
              { ...values, amount: Number(values.amount) },
              transactionType
            );
            showSnackbar({
              severity: "success",
              message: "Transaction Submitted!",
            });
          }}
        >
          {({ isValid, isSubmitting, dirty }) => (
            <Box component={Form} sx={{ width: "100%", mt: 1 }}>
              <FormTextField
                id="transaction-create-amount-input"
                name="amount"
                type="text"
                required
                placeholder="Amount"
                variant="outlined"
                margin="dense"
                fullWidth
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
              <FormTextField
                id="transaction-create-description-input"
                name="description"
                type="text"
                required
                placeholder="Add a note"
                variant="outlined"
                margin="dense"
                fullWidth
              />
              <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mx: 0, mb: 2 }}
                    disabled={!isValid || isSubmitting || !dirty}
                    onClick={() => setTransactionType("request")}
                  >
                    Request
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mx: 0, mb: 2 }}
                    disabled={!isValid || isSubmitting || !dirty}
                    onClick={() => setTransactionType("payment")}
                  >
                    Pay
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Formik>
      </Container>
    </Paper>
  );
}
