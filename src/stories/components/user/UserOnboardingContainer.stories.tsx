// stories/components/user/UserOnboardingContainer.stories.tsx
import { createActor } from "xstate";
import {
  withRouter,
  reactRouterParameters,
} from "storybook-addon-react-router-v6";
import UserOnboardingContainer from "@/components/user/UserOnboardingContainer";
import { authMachine } from "@/machines/authMachine";
import { bankAccountsMachine } from "@/machines/bankAccountsMachine";
import { bankAccounts, users } from "@/stories/data";
import type { Meta, StoryObj } from "@storybook/react";

function StoryComponent() {
  const authActor = createActor(authMachine, {
    snapshot: authMachine.resolveState({
      value: "authorized",
      context: {
        user: users[0],
      },
    }),
  }).start();
  const bankAccountsActor = createActor(bankAccountsMachine, {
    snapshot: bankAccountsMachine.resolveState({
      value: "success",
      context: {
        results: bankAccounts.slice(),
      },
    }),
  }).start();

  return (
    <UserOnboardingContainer
      authActor={authActor}
      bankAccountsActor={bankAccountsActor}
    />
  );
}

const meta: Meta<typeof StoryComponent> = {
  title: "components/user/UserOnboardingContainer",
  component: StoryComponent,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "*" },
      location: { path: "/" },
    }),
  },
};

export default meta;

type Story = StoryObj<typeof StoryComponent>;

export const Default: Story = {
  args: {},
};
