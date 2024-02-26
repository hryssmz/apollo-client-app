// stories/components/svg/SvgPersonalFinance.stories.tsx
import SvgPersonalFinance from "@/components/svg/SvgPersonalFinance";
import type { Meta, StoryObj } from "@storybook/react";
import type { SvgPersonalFinanceProps } from "@/components/svg/SvgPersonalFinance";

const meta: Meta<typeof SvgPersonalFinance> = {
  title: "components/svg/SvgPersonalFinance",
  component: SvgPersonalFinance,
};

export default meta;

type Story = StoryObj<typeof SvgPersonalFinance>;

const defaultArgs: SvgPersonalFinanceProps = {};

export const Default: Story = {
  args: { ...defaultArgs },
};
