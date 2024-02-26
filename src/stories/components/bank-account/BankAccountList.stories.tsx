// stories/components/bank-account/BankAccountList.stories.tsx
import BankAccountList from "@/components/bank-account/BankAccountList";
import { bankAccounts } from "@/stories/data";
import type { Meta, StoryObj } from "@storybook/react";
import type { BankAccountListProps } from "@/components/bank-account/BankAccountList";

const meta: Meta<typeof BankAccountList> = {
  title: "components/bank-account/BankAccountList",
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
