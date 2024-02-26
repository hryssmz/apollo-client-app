// stories/components/svg/SvgNavigator.stories.tsx
import SvgNavigator from "@/components/svg/SvgNavigator";
import type { Meta, StoryObj } from "@storybook/react";
import type { SvgNavigatorProps } from "@/components/svg/SvgNavigator";

const meta: Meta<typeof SvgNavigator> = {
  title: "components/svg/SvgNavigator",
  component: SvgNavigator,
};

export default meta;

type Story = StoryObj<typeof SvgNavigator>;

const defaultArgs: SvgNavigatorProps = {};

export const Default: Story = {
  args: { ...defaultArgs },
};
