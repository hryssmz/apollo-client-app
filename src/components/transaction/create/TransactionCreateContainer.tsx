// components/transaction/create/TransactionCreateContainer.tsx
import { useEffect } from "react";
import { useActor } from "@xstate/react";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import TransactionCreateStepOne from "./TransactionCreateStepOne";
import TransactionCreateStepTwo from "./TransactionCreateStepTwo";
import TransactionCreateStepThree from "./TransactionCreateStepThree";
import { createTransactionMachine } from "@/machines/createTransactionMachine";
import { usersMachine } from "@/machines/usersMachine";
import type { AuthSnapshot } from "@/machines/authMachine";
import type { SnackbarActorRef } from "@/machines/snackbarMachine";

export interface TransactionCreateContainerProps {
  authState: AuthSnapshot;
  snackbarActor: SnackbarActorRef;
}

export default function TransactionCreateContainer({
  authState,
  snackbarActor,
}: TransactionCreateContainerProps) {
  const [
    createTransactionState,
    createTransactionSend,
    createTransactionActor,
  ] = useActor(createTransactionMachine);
  const [usersState, sendUsers] = useActor(usersMachine);

  useEffect(() => {
    sendUsers({ type: "FETCH" });
  }, [sendUsers]);

  const sender = authState.context.user!;
  const activeStep = createTransactionState.matches("stepOne")
    ? 0
    : createTransactionState.matches("stepTwo")
    ? 1
    : createTransactionState.matches("stepThree")
    ? 2
    : createTransactionState.matches("creating")
    ? 2
    : -1;

  return (
    <>
      <Stepper activeStep={activeStep}>
        <Step key="stepOne">
          <StepLabel>Select Contact</StepLabel>
        </Step>
        <Step key="stepTwo">
          <StepLabel>Payment</StepLabel>
        </Step>
        <Step key="stepThree">
          <StepLabel>Complete</StepLabel>
        </Step>
      </Stepper>
      {createTransactionState.matches("stepOne") && (
        <TransactionCreateStepOne
          setReceiver={receiver => {
            createTransactionSend({ type: "SET_USERS", sender, receiver });
          }}
          users={usersState.context.results}
          userListSearch={({ q }) => {
            sendUsers({ type: "FETCH", q });
          }}
        />
      )}
      {createTransactionState.matches("stepTwo") && (
        <TransactionCreateStepTwo
          receiver={createTransactionState.context.receiver!}
          sender={sender}
          createTransaction={(payload, transactionType) => {
            createTransactionSend({
              type: "CREATE",
              payload: {
                ...payload,
                source: "",
                balanceAtCompletion: 0,
                privacyLevel: "public",
                requestStatus: "pending",
                status: "pending",
              },
              transactionType,
            });
          }}
          showSnackbar={payload => {
            snackbarActor.send({ type: "SHOW", ...payload });
          }}
        />
      )}
      {createTransactionState.matches("stepThree") && (
        <TransactionCreateStepThree
          createTransactionActor={createTransactionActor}
        />
      )}
    </>
  );
}
