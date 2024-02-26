// components/user/UserOnboardingContainer.tsx
import { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { useActor, useSelector } from "@xstate/react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import BankAccountForm from "@/components/bank-account/BankAccountForm";
import SvgNavigator from "@/components/svg/SvgNavigator";
import SvgPersonalFinance from "@/components/svg/SvgPersonalFinance";
import { userOnboardingMachine } from "@/machines/userOnboardingMachine";
import type { AuthActorRef } from "@/machines/authMachine";
import type { BankAccountsActorRef } from "@/machines/bankAccountsMachine";

export interface UserOnboardingContainerProps {
  authActor: AuthActorRef;
  bankAccountsActor: BankAccountsActorRef;
}

export default function UserOnboardingContainer({
  authActor,
  bankAccountsActor,
}: UserOnboardingContainerProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const authState = useSelector(authActor, snapshot => snapshot);
  const bankAccountsState = useSelector(
    bankAccountsActor,
    snapshot => snapshot
  );
  const [userOnboardingState, sendUserOnboarding] = useActor(
    userOnboardingMachine
  );
  const currentUser = authState.context.user;

  useEffect(() => {
    bankAccountsActor.send({ type: "FETCH" });
  }, [bankAccountsActor.send]);

  const noBankAccounts =
    bankAccountsState.matches("success") &&
    bankAccountsState.context.results.length === 0;

  const dialogIsOpen =
    (userOnboardingState.matches("stepOne") && !noBankAccounts) ||
    (userOnboardingState.matches("stepTwo") && !noBankAccounts) ||
    (userOnboardingState.matches("stepThree") && !noBankAccounts) ||
    (userOnboardingState.matches("done") && noBankAccounts);

  if (currentUser === undefined) {
    return <div>Please login</div>;
  }

  return (
    <Dialog fullScreen={fullScreen} open={dialogIsOpen}>
      <DialogTitle>
        {userOnboardingState.matches("stepOne") &&
          "Get Started with Real World App"}
        {userOnboardingState.matches("stepTwo") && "Create Bank Account"}
        {userOnboardingState.matches("stepThree") && "Finished"}
      </DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center" justifyContent="center">
          {userOnboardingState.matches("stepOne") && (
            <>
              <SvgNavigator />
              <br />
              <DialogContentText sx={{ pl: "20px" }}>
                Real World App requires a Bank Account to perform transactions.
                <br />
                <br />
                Click <b>Next</b> to begin setup of your Bank Account.
              </DialogContentText>
            </>
          )}
          {userOnboardingState.matches("stepTwo") && (
            <BankAccountForm
              userId={currentUser.id}
              createBankAccount={payload => {
                bankAccountsActor.send({ type: "CREATE", payload });
                sendUserOnboarding({ type: "NEXT" });
              }}
              onboarding
            />
          )}
          {userOnboardingState.matches("stepThree") && (
            <>
              <SvgPersonalFinance />
              <br />
              <DialogContentText sx={{ pl: "20px" }}>
                You're all set!
                <br />
                <br />
                We're excited to have you aboard the Real World App!
              </DialogContentText>
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Button
              sx={{ pr: "80%" }}
              onClick={() => {
                authActor.send({
                  type: "LOGOUT",
                  payload: { id: currentUser.id },
                });
              }}
              color="secondary"
            >
              Logout
            </Button>
          </Grid>
          <Grid item>
            {!userOnboardingState.matches("stepTwo") && (
              <Button
                onClick={() => {
                  sendUserOnboarding({ type: "NEXT" });
                }}
              >
                {userOnboardingState.matches("stepThree") ? "Done" : "Next"}
              </Button>
            )}
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
