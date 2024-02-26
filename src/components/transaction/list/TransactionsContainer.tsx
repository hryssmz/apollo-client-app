// components/transaction/list/TransactionsContainer.tsx
import { Route, Routes } from "react-router-dom";
import { useActor } from "@xstate/react";
import TransactionContactList from "./TransactionContactList";
import TransactionFilters from "./TransactionFilters";
import TransactionPersonalList from "./TransactionPersonalList";
import TransactionPublicList from "./TransactionPublicList";
import { transactionFiltersMachine } from "@/machines/transactionFiltersMachine";

export default function TransactionsContainer() {
  const [transactionFiltersState, sendTransactionFilters] = useActor(
    transactionFiltersMachine
  );
  const { dateStart, dateEnd, amountMin, amountMax } =
    transactionFiltersState.context;

  const Filters = (
    <TransactionFilters
      dateStart={dateStart}
      dateEnd={dateEnd}
      amountMin={amountMin}
      amountMax={amountMax}
      filterDateRange={payload => {
        sendTransactionFilters({ type: "DATE_FILTER", ...payload });
      }}
      resetDateRange={() => {
        sendTransactionFilters({ type: "DATE_RESET" });
      }}
      filterAmountRange={payload => {
        sendTransactionFilters({ type: "AMOUNT_FILTER", ...payload });
      }}
      resetAmountRange={() => {
        sendTransactionFilters({ type: "AMOUNT_RESET" });
      }}
    />
  );

  return (
    <Routes>
      <Route
        path="/contacts"
        element={
          <TransactionContactList
            filterComponent={Filters}
            dateStart={dateStart}
            dateEnd={dateEnd}
            amountMin={amountMin}
            amountMax={amountMax}
          />
        }
      />
      <Route
        path="/personal"
        element={
          <TransactionPersonalList
            filterComponent={Filters}
            dateStart={dateStart}
            dateEnd={dateEnd}
            amountMin={amountMin}
            amountMax={amountMax}
          />
        }
      />
      <Route
        path="/(public)?"
        element={
          <TransactionPublicList
            filterComponent={Filters}
            dateStart={dateStart}
            dateEnd={dateEnd}
            amountMin={amountMin}
            amountMax={amountMax}
          />
        }
      />
    </Routes>
  );
}
