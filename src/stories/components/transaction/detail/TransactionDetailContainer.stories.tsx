// stories/components/transaction/detail/TransactionDetailContainer.stories.tsx
import {
  withRouter,
  reactRouterParameters,
} from "storybook-addon-react-router-v6";
import TransactionDetailContainer from "@/components/transaction/detail/TransactionDetailContainer";
import { authMachine } from "@/machines/authMachine";
import { users, transactions } from "@/stories/data";
import type { Meta, StoryObj } from "@storybook/react";

function StoryComponent() {
  const authState = authMachine.resolveState({
    value: "authorized",
    context: {
      user: users[0],
    },
  });

  return <TransactionDetailContainer authState={authState} />;
}

const meta: Meta<typeof StoryComponent> = {
  title: "components/transaction/detail/TransactionDetailContainer",
  component: StoryComponent,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "/transaction/:transactionId" },
      location: { path: `/transaction/${transactions[0].id}` },
    }),
  },
};

export default meta;

type Story = StoryObj<typeof StoryComponent>;

export const Default: Story = {
  args: {},
};
