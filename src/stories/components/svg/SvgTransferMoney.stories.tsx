// stories/components/svg/SvgTransferMoney.stories.tsx
import SvgTransferMoney from "@/components/svg/SvgTransferMoney";
import type { Meta, StoryObj } from "@storybook/react";
import type { SvgTransferMoneyProps } from "@/components/svg/SvgTransferMoney";

const meta: Meta<typeof SvgTransferMoney> = {
  title: "components/svg/SvgTransferMoney",
  component: SvgTransferMoney,
};

export default meta;

type Story = StoryObj<typeof SvgTransferMoney>;

const defaultArgs: SvgTransferMoneyProps = {};

export const Default: Story = {
  args: { ...defaultArgs },
};
