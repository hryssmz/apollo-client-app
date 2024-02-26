// stories/components/transaction/detail/TransactionTitle.stories.tsx
import TransactionTitle from "@/components/transaction/detail/TransactionTitle";
import { transactions, users } from "@/stories/data";
import type { Meta, StoryObj } from "@storybook/react";
import type { TransactionTitleProps } from "@/components/transaction/detail/TransactionTitle";

const meta: Meta<typeof TransactionTitle> = {
  title: "components/transaction/detail/TransactionTitle",
  component: TransactionTitle,
};

export default meta;

type Story = StoryObj<typeof TransactionTitle>;

const defaultArgs: TransactionTitleProps = {
  requestStatus: transactions[0].requestStatus,
  senderName: `${users[0].firstName} ${users[0].lastName}`,
  receiverName: `${users[1].firstName} ${users[1].lastName}`,
};

export const Default: Story = {
  args: { ...defaultArgs },
};
