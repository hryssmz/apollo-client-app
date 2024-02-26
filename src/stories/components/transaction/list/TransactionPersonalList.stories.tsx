// stories/components/transaction/list/TransactionPersonalList.stories.tsx
import {
  withRouter,
  reactRouterParameters,
} from "storybook-addon-react-router-v6";
import TransactionPersonalList from "@/components/transaction/list/TransactionPersonalList";
import type { Meta, StoryObj } from "@storybook/react";
import type { TransactionPersonalListProps } from "@/components/transaction/list/TransactionPersonalList";

const meta: Meta<typeof TransactionPersonalList> = {
  title: "components/transaction/list/TransactionPersonalList",
  component: TransactionPersonalList,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "*" },
      location: { path: "/transactions" },
    }),
  },
};

export default meta;

type Story = StoryObj<typeof TransactionPersonalList>;

const defaultArgs: TransactionPersonalListProps = {
  filterComponent: <div>FilterComponent</div>,
};

export const Default: Story = {
  args: { ...defaultArgs },
};
