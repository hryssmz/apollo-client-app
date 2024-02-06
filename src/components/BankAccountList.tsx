// components/BankAccountList.tsx
import List from "@mui/material/List";
import BankAccountItem from "./BankAccountItem";
import EmptyList from "./EmptyList";
import type { BankAccount } from "@/models";

export interface BankAccountListProps {
  bankAccounts: BankAccount[];
  deleteBankAccount: ({ id }: Pick<BankAccount, "id">) => void;
}

export default function BankAccountList({
  bankAccounts,
  deleteBankAccount,
}: BankAccountListProps) {
  return bankAccounts.length > 0 ? (
    <List>
      {bankAccounts.map(bankAccount => (
        <BankAccountItem
          key={bankAccount.id}
          bankAccount={bankAccount}
          deleteBankAccount={deleteBankAccount}
        />
      ))}
    </List>
  ) : (
    <EmptyList entity="Bank Accounts" />
  );
}
