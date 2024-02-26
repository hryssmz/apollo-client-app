// components/transaction/list/TransactionPublicList.tsx
import { useEffect } from "react";
import { useMachine } from "@xstate/react";
import { publicTransactionMachine } from "@/machines/publicTransactionMachine";
import TransactionList from "./TransactionList";

export interface TransactionPublicListProps {
  filterComponent: React.ReactNode;
  dateStart?: number;
  dateEnd?: number;
  amountMin?: number;
  amountMax?: number;
}

export default function TransactionPublicList({
  filterComponent,
  dateStart,
  dateEnd,
  amountMin,
  amountMax,
}: TransactionPublicListProps) {
  const [current, send] = useMachine(publicTransactionMachine);
  const { results, pageData } = current.context;
  useEffect(() => {
    send({
      type: "FETCH",
      userId: "",
      dateStart,
      dateEnd,
      amountMin,
      amountMax,
    });
  }, [send, dateStart, dateEnd, amountMin, amountMax]);

  return (
    <TransactionList
      filterComponent={filterComponent}
      header="Contacts"
      transactions={results}
      isLoading={current.matches("loading")}
      loadNextPage={page =>
        send({
          type: "FETCH_MORE",
          userId: "",
          page,
          dateStart,
          dateEnd,
          amountMin,
          amountMax,
        })
      }
      pageData={pageData}
      showCreateButton
    />
  );
}
