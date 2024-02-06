// stories/components/BankAccountList.stories.tsx
import BankAccountList from "@/components/BankAccountList";
import { bankAccounts } from "../data/bankAccount";
import type { Meta, StoryObj } from "@storybook/react";
import type { BankAccountListProps } from "@/components/BankAccountList";

const meta: Meta<typeof BankAccountList> = {
  title: "components/BankAccountList",
  component: BankAccountList,
};

export default meta;

type Story = StoryObj<typeof BankAccountList>;

const defaultArgs: BankAccountListProps = {
  bankAccounts: [...bankAccounts],
  deleteBankAccount: ({ id }) => {
    alert(`Delete bank account: ${id}`);
  },
};

export const Default: Story = {
  args: { ...defaultArgs },
};

export const Empty: Story = {
  args: { ...defaultArgs, bankAccounts: [] },
};
