// stories/components/nav/NavDrawer.stories.tsx
import { createActor } from "xstate";
import {
  withRouter,
  reactRouterParameters,
} from "storybook-addon-react-router-v6";
import NavDrawer from "@/components/nav/NavDrawer";
import { authMachine } from "@/machines/authMachine";
import { users } from "@/stories/data";
import type { Meta, StoryObj } from "@storybook/react";

interface StoryArgs {
  open: boolean;
}

function StoryComponent({ open }: StoryArgs) {
  const authActor = createActor(authMachine, {
    snapshot: authMachine.resolveState({
      value: "authorized",
      context: { user: users[0] },
    }),
  }).start();

  return (
    <NavDrawer
      drawerOpen={open}
      authActor={authActor}
      closeMobileDrawer={() => {
        alert("Close mobile drawer!");
      }}
      toggleDrawer={() => {
        alert("Toggle drawer!");
      }}
    />
  );
}

const meta: Meta<typeof StoryComponent> = {
  title: "components/nav/NavDrawer",
  component: StoryComponent,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "*" },
      location: { path: "/public" },
    }),
  },
};

export default meta;

type Story = StoryObj<typeof StoryComponent>;

const defaultArgs: StoryArgs = {
  open: true,
};

export const Default: Story = {
  args: { ...defaultArgs },
};
