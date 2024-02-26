// stories/components/nav/NavBar.stories.tsx
import {
  withRouter,
  reactRouterParameters,
} from "storybook-addon-react-router-v6";
import NavBar from "@/components/nav/NavBar";
import { notificationsMachine } from "@/machines/notificationsMachine";
import { notifications } from "@/stories/data";
import type { Meta, StoryObj } from "@storybook/react";

interface StoryArgs {
  open: boolean;
}

function StoryComponent({ open }: StoryArgs) {
  const notificationsState = notificationsMachine.resolveState({
    context: {
      results: notifications
        .filter(
          ({ userId, isRead }) => userId === notifications[0].userId && !isRead
        )
        .sort((a, b) => a.modifiedAt.getTime() - b.modifiedAt.getTime()),
    },
    value: "success",
  });

  return (
    <NavBar
      drawerOpen={open}
      toggleDrawer={() => {
        alert("Toggle drawer!");
      }}
      notificationsState={notificationsState}
    />
  );
}

const meta: Meta<typeof StoryComponent> = {
  title: "components/nav/NavBar",
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
  open: false,
};

export const Default: Story = {
  args: { ...defaultArgs },
};
