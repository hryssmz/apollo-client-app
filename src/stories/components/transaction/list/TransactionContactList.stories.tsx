// stories/components/transaction/list/TransactionContactList.stories.tsx
import {
  withRouter,
  reactRouterParameters,
} from "storybook-addon-react-router-v6";
import TransactionContactList from "@/components/transaction/list/TransactionContactList";
import type { Meta, StoryObj } from "@storybook/react";
import type { TransactionContactListProps } from "@/components/transaction/list/TransactionContactList";

const meta: Meta<typeof TransactionContactList> = {
  title: "components/transaction/list/TransactionContactList",
  component: TransactionContactList,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "*" },
      location: { path: "/transactions" },
    }),
  },
};

export default meta;

type Story = StoryObj<typeof TransactionContactList>;

const defaultArgs: TransactionContactListProps = {
  filterComponent: <div>FilterComponent</div>,
};

export const Default: Story = {
  args: { ...defaultArgs },
};
