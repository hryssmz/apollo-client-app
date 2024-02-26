// stories/components/transaction/list/TransactionsContainer.stories.tsx
import { MemoryRouter } from "react-router-dom";
import TransactionsContainer from "@/components/transaction/list/TransactionsContainer";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TransactionsContainer> = {
  title: "components/transaction/list/TransactionsContainer",
  component: TransactionsContainer,
};

export default meta;

type Story = StoryObj<typeof TransactionsContainer>;

export const Default: Story = {
  args: {},
  decorators: [
    (Story, { args }) => (
      <MemoryRouter initialEntries={[{ pathname: "/" }]}>
        <Story {...args} />
      </MemoryRouter>
    ),
  ],
};

export const Contacts: Story = {
  args: {},
  decorators: [
    (Story, { args }) => (
      <MemoryRouter initialEntries={[{ pathname: "/contacts" }]}>
        <Story {...args} />
      </MemoryRouter>
    ),
  ],
};

export const Personal: Story = {
  args: {},
  decorators: [
    (Story, { args }) => (
      <MemoryRouter initialEntries={[{ pathname: "/personal" }]}>
        <Story {...args} />
      </MemoryRouter>
    ),
  ],
};

export const Public: Story = {
  args: {},
  decorators: [
    (Story, { args }) => (
      <MemoryRouter initialEntries={[{ pathname: "/public" }]}>
        <Story {...args} />
      </MemoryRouter>
    ),
  ],
};
