// stories/components/transaction/list/TransactionInfiniteList.stories.tsx
import {
  withRouter,
  reactRouterParameters,
} from "storybook-addon-react-router-v6";
import TransactionInfiniteList from "@/components/transaction/list/TransactionInfiniteList";
import { comments, likes, transactions, users } from "@/stories/data";
import type { Meta, StoryObj } from "@storybook/react";
import type { TransactionInfiniteListProps } from "@/components/transaction/list/TransactionInfiniteList";

const meta: Meta<typeof TransactionInfiniteList> = {
  title: "components/transaction/list/TransactionInfiniteList",
  component: TransactionInfiniteList,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "*" },
      location: { path: "/transactions" },
    }),
  },
};

export default meta;

type Story = StoryObj<typeof TransactionInfiniteList>;

const defaultArgs: TransactionInfiniteListProps = {
  pageData: {
    count: 35,
    page: 2,
    limit: 10,
  },
  loadNextPage: () => {
    alert("Load next page");
  },
  transactions: [...new Array(10)].map(() => ({
    transaction: transactions[0],
    sender: users[0],
    receiver: users[1],
    likes: likes.slice(5),
    comments: comments.slice(3),
  })),
};

export const Default: Story = {
  args: { ...defaultArgs },
};
