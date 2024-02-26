// stories/components/notification/NotificationsContainer.stories.tsx
import { createActor } from "xstate";
import {
  withRouter,
  reactRouterParameters,
} from "storybook-addon-react-router-v6";
import NotificationsContainer from "@/components/notification/NotificationsContainer";
import { authMachine } from "@/machines/authMachine";
import { notificationsMachine } from "@/machines/notificationsMachine";
import { users } from "@/stories/data";
import type { Meta, StoryObj } from "@storybook/react";

function StoryComponent() {
  const authState = authMachine.resolveState({
    value: "authorized",
    context: {
      user: users[0],
    },
  });
  const notificationsActor = createActor(notificationsMachine, {
    snapshot: notificationsMachine.resolveState({
      value: "initial",
      context: { results: [] },
    }),
  }).start();

  return (
    <NotificationsContainer
      authState={authState}
      notificationsActor={notificationsActor}
    />
  );
}

const meta: Meta<typeof StoryComponent> = {
  title: "components/notification/NotificationsContainer",
  component: StoryComponent,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "*" },
      location: { path: "/notifications" },
    }),
  },
};

export default meta;

type Story = StoryObj<typeof StoryComponent>;

export const Default: Story = {
  args: {},
};
