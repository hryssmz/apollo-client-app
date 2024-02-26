// components/transaction/create/TransactionCreateStepThree.tsx
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector } from "@xstate/react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { formatAmount } from "@/utils/transaction";
import type { CreateTransactionActorRef } from "@/machines/createTransactionMachine";

export interface TransactionCreateStepThreeProps {
  createTransactionActor: CreateTransactionActorRef;
}

export default function TransactionCreateStepThree({
  createTransactionActor,
}: TransactionCreateStepThreeProps) {
  const navigate = useNavigate();
  const createTransactionState = useSelector(
    createTransactionActor,
    snapshot => snapshot
  );
  const { receiver, transactionPayload } = createTransactionState.context;

  if (receiver === undefined || transactionPayload === undefined) {
    return <div>missing receiver or transactionPayload</div>;
  }

  return (
    <Paper
      elevation={0}
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box
        display="flex"
        justifyContent="center"
        width="95%"
        minHeight={200}
        height={200}
        style={{ paddingTop: "5%" }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={4}
        >
          <Grid item>
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
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        height="100%"
        style={{ paddingBottom: "5%" }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              {`${
                transactionPayload.transactionType === "payment"
                  ? "Paid"
                  : "Requested"
              } ${formatAmount(transactionPayload.amount * 100)} for ${
                transactionPayload.description
              }`}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        height={100}
        style={{ paddingBottom: "5%" }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item>
            <Button
              variant="contained"
              size="small"
              component={RouterLink}
              to="/"
            >
              Return To Transactions
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                createTransactionActor.send({ type: "RESET" });
                navigate("/transaction/new");
              }}
            >
              Create Another Transaction
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
