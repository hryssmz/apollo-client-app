// components/transaction/detail/TransactionDetailContainer.tsx
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useActor } from "@xstate/react";
import TransactionDetail from "./TransactionDetail";
import { transactionDetailMachine } from "@/machines/transactionDetailMachine";
import type { AuthSnapshot } from "@/machines/authMachine";

export interface TransactionDetailContainerProps {
  authState: AuthSnapshot;
}

export default function TransactionDetailContainer({
  authState,
}: TransactionDetailContainerProps) {
  const { transactionId = "" } = useParams();
  const [transactionDetailState, sendTransactionDetail] = useActor(
    transactionDetailMachine
  );

  useEffect(() => {
    sendTransactionDetail({ type: "FETCH", id: transactionId });
  }, [sendTransactionDetail, transactionId]);

  const transactionDetail = transactionDetailState.context.transactionDetail;
  const currentUser = authState.context.user!;

  return (
    <>
      {transactionDetailState.matches("initial") && (
        <div>
          Loading...
          <br />
        </div>
      )}
      {transactionDetailState.matches("success") && transactionDetail && (
        <TransactionDetail
          transaction={transactionDetail.transaction}
          sender={transactionDetail.sender}
          receiver={transactionDetail.receiver}
          comments={transactionDetail.comments}
          likes={transactionDetail.likes}
          currentUser={currentUser}
          transactionComment={payload => {
            sendTransactionDetail({ type: "CREATE_COMMENT", payload });
          }}
          transactionLike={payload => {
            sendTransactionDetail({ type: "CREATE_LIKE", payload });
          }}
          transactionUpdate={payload => {
            sendTransactionDetail({ type: "UPDATE", payload });
          }}
        />
      )}
    </>
  );
}
