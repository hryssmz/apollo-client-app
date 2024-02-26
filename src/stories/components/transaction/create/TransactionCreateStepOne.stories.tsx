// stories/components/transaction/create/TransactionCreateStepOne.stories.tsx
import TransactionCreateStepOne from "@/components/transaction/create/TransactionCreateStepOne";
import { users } from "@/stories/data";
import type { Meta, StoryObj } from "@storybook/react";
import type { TransactionCreateStepOneProps } from "@/components/transaction/create/TransactionCreateStepOne";

const meta: Meta<typeof TransactionCreateStepOne> = {
  title: "components/transaction/create/TransactionCreateStepOne",
  component: TransactionCreateStepOne,
};

export default meta;

type Story = StoryObj<typeof TransactionCreateStepOne>;

const defaultArgs: TransactionCreateStepOneProps = {
  users: users.slice(0),
  setReceiver: user => {
    alert(`set receiver: ${JSON.stringify(user, null, 2)}`);
  },
  userListSearch: ({ q }) => {
    console.log(q);
  },
};

export const Default: Story = {
  args: { ...defaultArgs },
};
