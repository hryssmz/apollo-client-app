// stories/components/transaction/create/TransactionCreateStepThree.stories.tsx
import { createActor } from "xstate";
import {
  withRouter,
  reactRouterParameters,
} from "storybook-addon-react-router-v6";
import TransactionCreateStepThree from "@/components/transaction/create/TransactionCreateStepThree";
import { createTransactionMachine } from "@/machines/createTransactionMachine";
import { transactions, users } from "@/stories/data";
import type { Meta, StoryObj } from "@storybook/react";

function StoryComponent() {
  const createTransactionActor = createActor(createTransactionMachine, {
    snapshot: createTransactionMachine.resolveState({
      value: "stepThree",
      context: {
        sender: users[0],
        receiver: users[1],
        transactionPayload: {
          amount: transactions[0].amount,
          description: transactions[0].description,
          senderId: users[0].id,
          receiverId: users[1].id,
          transactionType: "payment"
        },
      },
    }),
  }).start();

  return (
    <TransactionCreateStepThree
      createTransactionActor={createTransactionActor}
    />
  );
}

const meta: Meta<typeof StoryComponent> = {
  title: "components/transaction/create/TransactionCreateStepThree",
  component: StoryComponent,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "*" },
      location: { path: "/transaction/new" },
    }),
  },
};

export default meta;

type Story = StoryObj<typeof StoryComponent>;

export const Default: Story = {
  args: {},
};
