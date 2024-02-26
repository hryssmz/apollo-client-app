// stories/components/transaction/detail/TransactionItem.stories.tsx
import {
  withRouter,
  reactRouterParameters,
} from "storybook-addon-react-router-v6";
import TransactionItem from "@/components/transaction/detail/TransactionItem";
import { transactions, users } from "@/stories/data";
import type { Meta, StoryObj } from "@storybook/react";
import type { TransactionItemProps } from "@/components/transaction/detail/TransactionItem";

const meta: Meta<typeof TransactionItem> = {
  title: "components/transaction/detail/TransactionItem",
  component: TransactionItem,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "*" },
      location: { path: "/transactions" },
    }),
  },
};

export default meta;

type Story = StoryObj<typeof TransactionItem>;

const defaultArgs: TransactionItemProps = {
  id: transactions[0].id,
  description: transactions[0].description,
  requestStatus: transactions[0].requestStatus,
  amount: transactions[0].amount,
  senderName: `${users[0].firstName} ${users[0].lastName}`,
  senderAvatar: users[0].avatar ?? undefined,
  receiverName: `${users[1].firstName} ${users[1].lastName}`,
  receiverAvatar: users[1].avatar ?? undefined,
  likesCount: 5,
  commentsCount: 3,
};

export const Default: Story = {
  args: { ...defaultArgs },
};
