// components/bank-account/BankAccountList.tsx
import List from "@mui/material/List";
import BankAccountItem from "./BankAccountItem";
import EmptyList from "../common/EmptyList";
import type {
  BankAccount,
  MutationDeleteBankAccountArgs,
} from "@/graphql/graphql";

export interface BankAccountListProps {
  bankAccounts: Pick<BankAccount, "id" | "bankName" | "isDeleted">[];
  deleteBankAccount: (
    payload: MutationDeleteBankAccountArgs["payload"]
  ) => void;
}

export default function BankAccountList({
  bankAccounts,
  deleteBankAccount,
}: BankAccountListProps) {
  return bankAccounts.length > 0 ? (
    <List>
      {bankAccounts.map(({ id, bankName, isDeleted }) => (
        <BankAccountItem
          key={id}
          id={id}
          bankName={bankName}
          isDeleted={isDeleted}
          deleteBankAccount={deleteBankAccount}
        />
      ))}
    </List>
  ) : (
    <EmptyList entity="Bank Accounts" />
  );
}
