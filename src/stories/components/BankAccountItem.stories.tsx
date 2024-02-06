// stories/components/BankAccountItem.stories.tsx
import BankAccountItem from "@/components/BankAccountItem";
import { bankAccounts } from "../data/bankAccount";
import type { Meta, StoryObj } from "@storybook/react";
import type { BankAccountItemProps } from "@/components/BankAccountItem";

const meta: Meta<typeof BankAccountItem> = {
  title: "components/BankAccountItem",
  component: BankAccountItem,
};

export default meta;

type Story = StoryObj<typeof BankAccountItem>;

const defaultArgs: BankAccountItemProps = {
  bankAccount: {
    ...bankAccounts[0],
    isDeleted: false,
  },
  deleteBankAccount: ({ id }) => {
    alert(`Delete bank account: ${id}`);
  },
};

export const Default: Story = {
  args: { ...defaultArgs },
};

export const Deleted: Story = {
  args: {
    ...defaultArgs,
    bankAccount: { ...bankAccounts[0], isDeleted: true },
  },
};
