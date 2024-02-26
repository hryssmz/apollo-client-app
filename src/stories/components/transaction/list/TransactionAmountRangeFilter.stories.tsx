// stories/components/transaction/list/TransactionAmountRangeFilter.stories.tsx
import TransactionAmountRangeFilter from "@/components/transaction/list/TransactionAmountRangeFilter";
import type { Meta, StoryObj } from "@storybook/react";
import type { TransactionAmountRangeFilterProps } from "@/components/transaction/list/TransactionAmountRangeFilter";

const meta: Meta<typeof TransactionAmountRangeFilter> = {
  title: "components/transaction/list/TransactionAmountRangeFilter",
  component: TransactionAmountRangeFilter,
};

export default meta;

type Story = StoryObj<typeof TransactionAmountRangeFilter>;

const defaultArgs: TransactionAmountRangeFilterProps = {
  amountMin: 10,
  amountMax: 90,
  resetAmountRange: () => {
    alert("Reset amount range");
  },
  filterAmountRange: payload => {
    alert(`Filter amount range: ${JSON.stringify(payload, null, 2)}`);
  },
};

export const Default: Story = {
  args: { ...defaultArgs },
};
