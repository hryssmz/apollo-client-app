// stories/components/transaction/detail/TransactionAmount.stories.tsx
import TransactionAmount from "@/components/transaction/detail/TransactionAmount";
import { transactions } from "@/stories/data";
import type { Meta, StoryObj } from "@storybook/react";
import type { TransactionAmountProps } from "@/components/transaction/detail/TransactionAmount";

const meta: Meta<typeof TransactionAmount> = {
  title: "components/transaction/detail/TransactionAmount",
  component: TransactionAmount,
};

export default meta;

type Story = StoryObj<typeof TransactionAmount>;

const defaultArgs: TransactionAmountProps = {
  requestStatus: transactions[0].requestStatus,
  amount: transactions[0].amount,
};

export const Default: Story = {
  args: { ...defaultArgs },
};
