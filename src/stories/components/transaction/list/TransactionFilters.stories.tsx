// stories/components/transaction/list/TransactionFilters.stories.tsx
import TransactionFilters from "@/components/transaction/list/TransactionFilters";
import type { Meta, StoryObj } from "@storybook/react";
import type { TransactionFiltersProps } from "@/components/transaction/list/TransactionFilters";

const meta: Meta<typeof TransactionFilters> = {
  title: "components/transaction/list/TransactionFilters",
  component: TransactionFilters,
};

export default meta;

type Story = StoryObj<typeof TransactionFilters>;

const defaultArgs: TransactionFiltersProps = {
  amountMin: 10,
  amountMax: 90,
  dateStart: new Date("2022-04-01").getTime(),
  dateEnd: new Date("2022-04-05").getTime(),
  filterAmountRange: payload => {
    alert(`Filter amount range: ${JSON.stringify(payload, null, 2)}`);
  },
  filterDateRange: payload => {
    alert(JSON.stringify(payload, null, 2));
  },
  resetAmountRange: () => {
    alert("Reset amount range");
  },
  resetDateRange: () => {
    alert("Reset date range");
  },
};

export const Default: Story = {
  args: { ...defaultArgs },
};

export const DateAll: Story = {
  args: { ...defaultArgs, dateStart: undefined, dateEnd: undefined },
};
