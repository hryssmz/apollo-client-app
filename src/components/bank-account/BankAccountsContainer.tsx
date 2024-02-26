// components/bank-account/BankAccountsContainer.tsx
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useSelector } from "@xstate/react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MuiPaper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import BankAccountForm from "./BankAccountForm";
import BankAccountList from "./BankAccountList";
import type { AuthSnapshot } from "@/machines/authMachine";
import type { BankAccountsActorRef } from "@/machines/bankAccountsMachine";

const Paper = styled(MuiPaper)({
  p: 2,
  display: "flex",
  overflow: "auto",
  flexDirection: "column",
});

export interface BankAccountsContainerProps {
  authState: AuthSnapshot;
  bankAccountsActor: BankAccountsActorRef;
}

export default function BankAccountsContainer({
  authState,
  bankAccountsActor,
}: BankAccountsContainerProps) {
  const location = useLocation();
  const bankAccountsState = useSelector(
    bankAccountsActor,
    snapshot => snapshot
  );
  const currentUser = authState.context.user;

  if (location.pathname === "/bankaccounts/new" && currentUser) {
    return (
      <Paper>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Create Bank Account
        </Typography>
        <BankAccountForm
          userId={currentUser.id}
          createBankAccount={payload => {
            bankAccountsActor.send({ type: "CREATE", payload });
          }}
        />
      </Paper>
    );
  }

  return (
    <Paper>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to="/bankaccounts/new"
          >
            Create
          </Button>
        </Grid>
      </Grid>
      <BankAccountList
        bankAccounts={bankAccountsState.context.results}
        deleteBankAccount={payload => {
          bankAccountsActor.send({ type: "DELETE", payload });
        }}
      />
    </Paper>
  );
}
