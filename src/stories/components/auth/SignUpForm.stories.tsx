// stories/components/auth/SignUpForm.stories.tsx
import { createActor } from "xstate";
import {
  withRouter,
  reactRouterParameters,
} from "storybook-addon-react-router-v6";
import { userEvent } from "@storybook/testing-library";
import SignUpForm from "@/components/auth/SignUpForm";
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

  return <SignUpForm authActor={authActor} />;
}

const meta: Meta<typeof StoryComponent> = {
  title: "components/auth/SignUpForm",
  component: StoryComponent,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "*" },
      location: { path: "/signup" },
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
    const firstNameInput = canvasElement.querySelector(
      "#firstName"
    ) as HTMLInputElement;
    const lastNameInput = canvasElement.querySelector(
      "#lastName"
    ) as HTMLInputElement;
    const usernameInput = canvasElement.querySelector(
      "#username"
    ) as HTMLInputElement;
    const passwordInput = canvasElement.querySelector(
      "#password"
    ) as HTMLInputElement;
    const confirmPasswordInput = canvasElement.querySelector(
      "#confirmPassword"
    ) as HTMLInputElement;

    await user.type(firstNameInput, users[0].firstName);
    await user.type(lastNameInput, users[0].lastName);
    await user.type(usernameInput, users[0].username);
    await user.type(passwordInput, users[0].id);
    await user.type(confirmPasswordInput, users[0].id);
  },
};

export const Invalid: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const user = userEvent.setup();
    const firstNameInput = canvasElement.querySelector(
      "#firstName"
    ) as HTMLInputElement;
    const lastNameInput = canvasElement.querySelector(
      "#lastName"
    ) as HTMLInputElement;
    const usernameInput = canvasElement.querySelector(
      "#username"
    ) as HTMLInputElement;
    const passwordInput = canvasElement.querySelector(
      "#password"
    ) as HTMLInputElement;
    const confirmPasswordInput = canvasElement.querySelector(
      "#confirmPassword"
    ) as HTMLInputElement;

    await user.click(firstNameInput);
    await user.click(lastNameInput);
    await user.click(usernameInput);
    await user.type(passwordInput, "123");
    await user.type(confirmPasswordInput, "1234");
    await user.click(firstNameInput);
  },
};
