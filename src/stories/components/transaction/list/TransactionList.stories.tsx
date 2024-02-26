// stories/components/transaction/list/TransactionList.stories.tsx
import {
  withRouter,
  reactRouterParameters,
} from "storybook-addon-react-router-v6";
import TransactionList from "@/components/transaction/list/TransactionList";
import { comments, likes, transactions, users } from "@/stories/data";
import type { Meta, StoryObj } from "@storybook/react";
import type { TransactionListProps } from "@/components/transaction/list/TransactionList";

const meta: Meta<typeof TransactionList> = {
  title: "components/transaction/list/TransactionList",
  component: TransactionList,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "*" },
      location: { path: "/transactions" },
    }),
  },
};

export default meta;

type Story = StoryObj<typeof TransactionList>;

const defaultArgs: TransactionListProps = {
  header: "My Transaction List",
  filterComponent: <div>FilterComponent</div>,
  isLoading: false,
  showCreateButton: true,
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

export const Empty: Story = {
  args: {
    ...defaultArgs,
    pageData: {
      count: 0,
      page: 1,
      limit: 10,
    },
    transactions: [],
  },
};
