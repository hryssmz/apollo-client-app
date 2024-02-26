// stories/components/transaction/create/TransactionCreateContainer.stories.tsx
import { createActor } from "xstate";
import {
  withRouter,
  reactRouterParameters,
} from "storybook-addon-react-router-v6";
import TransactionCreateContainer from "@/components/transaction/create/TransactionCreateContainer";
import { authMachine } from "@/machines/authMachine";
import { snackbarMachine } from "@/machines/snackbarMachine";
import { users } from "@/stories/data";
import type { Meta, StoryObj } from "@storybook/react";

function StoryComponent() {
  const authState = authMachine.resolveState({
    value: "authorized",
    context: {
      user: users[0],
    },
  });
  const snackbarActor = createActor(snackbarMachine, {
    snapshot: snackbarMachine.resolveState({
      value: "invisible",
      context: { severity: undefined, message: undefined },
    }),
  }).start();

  return (
    <TransactionCreateContainer
      authState={authState}
      snackbarActor={snackbarActor}
    />
  );
}

const meta: Meta<typeof StoryComponent> = {
  title: "components/transaction/create/TransactionCreateContainer",
  component: StoryComponent,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "*" },
      location: { path: "/transactions/new" },
    }),
  },
};

export default meta;

type Story = StoryObj<typeof StoryComponent>;

export const Default: Story = {
  args: {},
};
