// stories/components/nav/TransactionNavTabs.stories.tsx
import {
  withRouter,
  reactRouterParameters,
} from "storybook-addon-react-router-v6";
import TransactionNavTabs from "@/components/nav/TransactionNavTabs";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TransactionNavTabs> = {
  title: "components/nav/TransactionNavTabs",
  component: TransactionNavTabs,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "*" },
      location: { path: "/public" },
    }),
  },
};

export default meta;

type Story = StoryObj<typeof TransactionNavTabs>;

export const Default: Story = {
  args: {},
};
