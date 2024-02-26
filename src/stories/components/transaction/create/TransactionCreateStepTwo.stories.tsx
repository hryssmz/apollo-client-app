// stories/components/transaction/create/TransactionCreateStepTwo.stories.tsx
import TransactionCreateStepTwo from "@/components/transaction/create/TransactionCreateStepTwo";
import { users } from "@/stories/data";
import type { Meta, StoryObj } from "@storybook/react";
import type { TransactionCreateStepTwoProps } from "@/components/transaction/create/TransactionCreateStepTwo";

const meta: Meta<typeof TransactionCreateStepTwo> = {
  title: "components/transaction/create/TransactionCreateStepTwo",
  component: TransactionCreateStepTwo,
};

export default meta;

type Story = StoryObj<typeof TransactionCreateStepTwo>;

const defaultArgs: TransactionCreateStepTwoProps = {
  receiver: users[0],
  sender: users[1],
  createTransaction: payload => {
    alert(`Create transaction: ${JSON.stringify(payload, null, 2)}`);
  },
  showSnackbar: payload => {
    alert(`Show snackbar: ${JSON.stringify(payload, null, 2)}`);
  },
};

export const Default: Story = {
  args: { ...defaultArgs },
};
