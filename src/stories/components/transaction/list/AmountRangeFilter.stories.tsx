// stories/components/transaction/list/AmountRangeFilter.stories.tsx
import AmountRangeFilter from "@/components/transaction/list/AmountRangeFilter";
import type { Meta, StoryObj } from "@storybook/react";
import type { AmountRangeFilterProps } from "@/components/transaction/list/AmountRangeFilter";

const meta: Meta<typeof AmountRangeFilter> = {
  title: "components/transaction/list/AmountRangeFilter",
  component: AmountRangeFilter,
};

export default meta;

type Story = StoryObj<typeof AmountRangeFilter>;

const defaultArgs: AmountRangeFilterProps = {
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
