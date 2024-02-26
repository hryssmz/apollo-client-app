// stories/components/transaction/detail/TransactionDetail.stories.tsx
import TransactionDetail from "@/components/transaction/detail/TransactionDetail";
import { comments, likes, transactions, users } from "@/stories/data";
import type { Meta, StoryObj } from "@storybook/react";
import type { TransactionDetailProps } from "@/components/transaction/detail/TransactionDetail";

const meta: Meta<typeof TransactionDetail> = {
  title: "components/transaction/detail/TransactionDetail",
  component: TransactionDetail,
};

export default meta;

type Story = StoryObj<typeof TransactionDetail>;

const defaultArgs: TransactionDetailProps = {
  comments: comments.slice(),
  likes: likes.slice(),
  transaction: transactions[0],
  currentUser: users[0],
  sender: users[1],
  receiver: users[2],
  transactionComment: payload => {
    alert(`Transaction comment: ${JSON.stringify(payload, null, 2)}`);
  },
  transactionLike: payload => {
    alert(`Transaction like: ${JSON.stringify(payload, null, 2)}`);
  },
  transactionUpdate: payload => {
    alert(`Transaction update: ${JSON.stringify(payload, null, 2)}`);
  },
};

export const Default: Story = {
  args: { ...defaultArgs },
};
