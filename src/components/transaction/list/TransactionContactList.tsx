// components/transaction/list/TransactionContactList.tsx
import { useEffect } from "react";
import { useMachine } from "@xstate/react";
import { contactsTransactionMachine } from "@/machines/contactsTransactionMachine";
import TransactionList from "./TransactionList";

export interface TransactionContactListProps {
  filterComponent: React.ReactNode;
  dateStart?: number;
  dateEnd?: number;
  amountMin?: number;
  amountMax?: number;
}

export default function TransactionContactList({
  filterComponent,
  dateStart,
  dateEnd,
  amountMin,
  amountMax,
}: TransactionContactListProps) {
  const [current, send] = useMachine(contactsTransactionMachine);
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
