// stories/components/nav/NavMainList.stories.tsx
import {
  withRouter,
  reactRouterParameters,
} from "storybook-addon-react-router-v6";
import NavMainList from "@/components/nav/NavMainList";
import type { Meta, StoryObj } from "@storybook/react";
import type { NavMainListProps } from "@/components/nav/NavMainList";

const meta: Meta<typeof NavMainList> = {
  title: "components/nav/NavMainList",
  component: NavMainList,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "*" },
      location: { path: "/public" },
    }),
  },
};

export default meta;

type Story = StoryObj<typeof NavMainList>;

const defaultArgs: NavMainListProps = {
  showTemporaryDrawer: true,
  toggleDrawer: () => {
    alert("Toggle drawer!");
  },
};

export const Default: Story = {
  args: { ...defaultArgs },
};
