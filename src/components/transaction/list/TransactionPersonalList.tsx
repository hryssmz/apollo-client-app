// components/transaction/list/TransactionPersonalList.tsx
import { useEffect } from "react";
import { useMachine } from "@xstate/react";
import { personalTransactionMachine } from "@/machines/personalTransactionMachine";
import TransactionList from "./TransactionList";

export interface TransactionPersonalListProps {
  filterComponent: React.ReactNode;
  dateStart?: number;
  dateEnd?: number;
  amountMin?: number;
  amountMax?: number;
}

export default function TransactionPersonalList({
  filterComponent,
  dateStart,
  dateEnd,
  amountMin,
  amountMax,
}: TransactionPersonalListProps) {
  const [current, send] = useMachine(personalTransactionMachine);
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
