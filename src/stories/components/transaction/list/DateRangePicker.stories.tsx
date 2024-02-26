// stories/components/transaction/list/DateRangePicker.stories.tsx
import DateRangePicker from "@/components/transaction/list/DateRangePicker";
import type { Meta, StoryObj } from "@storybook/react";
import type { DateRangePickerProps } from "@/components/transaction/list/DateRangePicker";

const meta: Meta<typeof DateRangePicker> = {
  title: "components/transaction/list/DateRangePicker",
  component: DateRangePicker,
};

export default meta;

type Story = StoryObj<typeof DateRangePicker>;

const defaultArgs: DateRangePickerProps = {
  filterDateRange: payload => {
    alert(JSON.stringify(payload, null, 2));
  },
  dateStart: new Date().getTime(),
  dateEnd: undefined,
};

export const Default: Story = {
  args: { ...defaultArgs },
};
