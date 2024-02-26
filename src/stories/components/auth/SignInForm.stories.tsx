// stories/components/auth/SignInForm.stories.tsx
import { createActor } from "xstate";
import {
  withRouter,
  reactRouterParameters,
} from "storybook-addon-react-router-v6";
import { userEvent } from "@storybook/testing-library";
import SignInForm from "@/components/auth/SignInForm";
import { authMachine } from "@/machines/authMachine";
import { users } from "@/stories/data";
import type { Meta, StoryObj } from "@storybook/react";

function StoryComponent() {
  const authActor = createActor(authMachine, {
    snapshot: authMachine.resolveState({
      value: "unauthorized",
      context: { user: undefined },
    }),
  }).start();

  return <SignInForm authActor={authActor} />;
}

const meta: Meta<typeof StoryComponent> = {
  title: "components/auth/SignInForm",
  component: StoryComponent,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "*" },
      location: { path: "/signin" },
    }),
  },
};

export default meta;

type Story = StoryObj<typeof StoryComponent>;

export const Default: Story = {
  args: {},
};

export const Valid: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const user = userEvent.setup();

    const usernameInput = canvasElement.querySelector(
      "#username"
    ) as HTMLInputElement;
    const passwordInput = canvasElement.querySelector(
      "#password"
    ) as HTMLInputElement;

    await user.type(usernameInput, users[0].username);
    await user.type(passwordInput, users[0].id);
  },
};

export const Invalid: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const user = userEvent.setup();

    const usernameInput = canvasElement.querySelector(
      "#username"
    ) as HTMLInputElement;
    const passwordInput = canvasElement.querySelector(
      "#password"
    ) as HTMLInputElement;

    await user.click(usernameInput);
    await user.type(passwordInput, "123");
    await user.click(usernameInput);
  },
};
