// stories/components/bank-account/BankAccountForm.stories.tsx
import {
  withRouter,
  reactRouterParameters,
} from "storybook-addon-react-router-v6";
import { userEvent, within } from "@storybook/testing-library";
import BankAccountForm from "@/components/bank-account/BankAccountForm";
import { users } from "@/stories/data";
import type { Meta, StoryObj } from "@storybook/react";
import type { BankAccountFormProps } from "@/components/bank-account/BankAccountForm";

const meta: Meta<typeof BankAccountForm> = {
  title: "components/bank-account/BankAccountForm",
  component: BankAccountForm,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "*" },
      location: { path: "/public" },
    }),
  },
};

export default meta;

type Story = StoryObj<typeof BankAccountForm>;

const defaultArgs: BankAccountFormProps = {
  userId: users[0].id,
  createBankAccount: payload => {
    alert(JSON.stringify(payload, null, 2));
  },
  onboarding: false,
};

export const Default: Story = {
  args: { ...defaultArgs },
};

export const Valid: Story = {
  args: { ...defaultArgs },
  play: async ({ canvasElement }) => {
    const user = userEvent.setup();
    const { getByPlaceholderText } = within(canvasElement);

    const bankNameInput = getByPlaceholderText("Bank Name");
    const routingNumberInput = getByPlaceholderText("Bank Number");
    const accountNumberInput = getByPlaceholderText("Account Number");

    await user.type(bankNameInput, "Kshlerin - Ledner Bank");
    await user.type(routingNumberInput, "024971142");
    await user.type(accountNumberInput, "3859571950");
  },
};

export const Invalid: Story = {
  args: { ...defaultArgs },
  play: async ({ canvasElement }) => {
    const user = userEvent.setup();
    const { getByPlaceholderText } = within(canvasElement);

    const bankNameInput = getByPlaceholderText("Bank Name");
    const routingNumberInput = getByPlaceholderText("Bank Number");
    const accountNumberInput = getByPlaceholderText("Account Number");

    await user.type(bankNameInput, "Kshl");
    await user.type(routingNumberInput, "02497114");
    await user.type(accountNumberInput, "38595719");
    await user.click(bankNameInput);
  },
};
