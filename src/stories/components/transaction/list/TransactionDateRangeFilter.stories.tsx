// stories/components/transaction/list/TransactionDateRangeFilter.stories.tsx
import TransactionDateRangeFilter from "@/components/transaction/list/TransactionDateRangeFilter";
import type { Meta, StoryObj } from "@storybook/react";
import type { TransactionDateRangeFilterProps } from "@/components/transaction/list/TransactionDateRangeFilter";

const meta: Meta<typeof TransactionDateRangeFilter> = {
  title: "components/transaction/list/TransactionDateRangeFilter",
  component: TransactionDateRangeFilter,
};

export default meta;

type Story = StoryObj<typeof TransactionDateRangeFilter>;

const defaultArgs: TransactionDateRangeFilterProps = {
  filterDateRange: payload => {
    alert(JSON.stringify(payload, null, 2));
  },
  dateStart: new Date("2022-04-01").getTime(),
  dateEnd: new Date("2022-04-05").getTime(),
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
