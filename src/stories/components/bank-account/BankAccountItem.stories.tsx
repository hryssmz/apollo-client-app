// stories/components/bank-account/BankAccountItem.stories.tsx
import BankAccountItem from "@/components/bank-account/BankAccountItem";
import { bankAccounts } from "@/stories/data";
import type { Meta, StoryObj } from "@storybook/react";
import type { BankAccountItemProps } from "@/components/bank-account/BankAccountItem";

const meta: Meta<typeof BankAccountItem> = {
  title: "components/bank-account/BankAccountItem",
  component: BankAccountItem,
};

export default meta;

type Story = StoryObj<typeof BankAccountItem>;

const defaultArgs: BankAccountItemProps = {
  id: bankAccounts[0].id,
  bankName: bankAccounts[0].bankName,
  isDeleted: false,
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
    isDeleted: true,
  },
};
