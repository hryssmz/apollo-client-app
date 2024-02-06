// stories/components/SvgRwaLogo.stories.tsx
import SvgRwaLogo from "@/components/SvgRwaLogo";
import type { Meta, StoryObj } from "@storybook/react";
import type { SvgRwaLogoProps } from "@/components/SvgRwaLogo";

const meta: Meta<typeof SvgRwaLogo> = {
  title: "components/SvgRwaLogo",
  component: SvgRwaLogo,
};

export default meta;

type Story = StoryObj<typeof SvgRwaLogo>;

const defaultArgs: SvgRwaLogoProps = {};

export const Default: Story = {
  args: { ...defaultArgs },
};
