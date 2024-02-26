// stories/components/svg/SvgRwaLogo.stories.tsx
import SvgRwaLogo from "@/components/svg/SvgRwaLogo";
import type { Meta, StoryObj } from "@storybook/react";
import type { SvgRwaLogoProps } from "@/components/svg/SvgRwaLogo";

const meta: Meta<typeof SvgRwaLogo> = {
  title: "components/svg/SvgRwaLogo",
  component: SvgRwaLogo,
};

export default meta;

type Story = StoryObj<typeof SvgRwaLogo>;

const defaultArgs: SvgRwaLogoProps = {};

export const Default: Story = {
  args: { ...defaultArgs },
};
