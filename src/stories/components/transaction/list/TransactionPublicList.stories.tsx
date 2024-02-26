// stories/components/transaction/list/TransactionPublicList.stories.tsx
import {
  withRouter,
  reactRouterParameters,
} from "storybook-addon-react-router-v6";
import TransactionPublicList from "@/components/transaction/list/TransactionPublicList";
import type { Meta, StoryObj } from "@storybook/react";
import type { TransactionPublicListProps } from "@/components/transaction/list/TransactionPublicList";

const meta: Meta<typeof TransactionPublicList> = {
  title: "components/transaction/list/TransactionPublicList",
  component: TransactionPublicList,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "*" },
      location: { path: "/transactions" },
    }),
  },
};

export default meta;

type Story = StoryObj<typeof TransactionPublicList>;

const defaultArgs: TransactionPublicListProps = {
  filterComponent: <div>FilterComponent</div>,
};

export const Default: Story = {
  args: { ...defaultArgs },
};
