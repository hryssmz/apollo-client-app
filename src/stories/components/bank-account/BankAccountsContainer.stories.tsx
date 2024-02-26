// stories/components/bank-account/BankAccountsContainer.stories.tsx
import { createActor } from "xstate";
import {
  withRouter,
  reactRouterParameters,
} from "storybook-addon-react-router-v6";
import BankAccountsContainer from "@/components/bank-account/BankAccountsContainer";
import { authMachine } from "@/machines/authMachine";
import { bankAccountsMachine } from "@/machines/bankAccountsMachine";
import { bankAccounts, users } from "@/stories/data";
import type { Meta, StoryObj } from "@storybook/react";

function StoryComponent() {
  const authState = authMachine.resolveState({
    value: "authorized",
    context: {
      user: users[0],
    },
  });
  const bankAccountsActor = createActor(bankAccountsMachine, {
    snapshot: bankAccountsMachine.resolveState({
      value: "success",
      context: {
        results: bankAccounts.slice(),
      },
    }),
  }).start();

  return (
    <BankAccountsContainer
      authState={authState}
      bankAccountsActor={bankAccountsActor}
    />
  );
}

const meta: Meta<typeof StoryComponent> = {
  title: "components/bank-account/BankAccountsContainer",
  component: StoryComponent,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "*" },
      location: { path: "/bankaccounts" },
    }),
  },
};

export default meta;

type Story = StoryObj<typeof StoryComponent>;

export const Default: Story = {
  args: {},
};
