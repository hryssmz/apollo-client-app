// stories/components/svg/SvgRwaIconLogo.stories.tsx
import SvgRwaIconLogo from "@/components/svg/SvgRwaIconLogo";
import type { Meta, StoryObj } from "@storybook/react";
import type { SvgRwaIconLogoProps } from "@/components/svg/SvgRwaIconLogo";

const meta: Meta<typeof SvgRwaIconLogo> = {
  title: "components/svg/SvgRwaIconLogo",
  component: SvgRwaIconLogo,
};

export default meta;

type Story = StoryObj<typeof SvgRwaIconLogo>;

const defaultArgs: SvgRwaIconLogoProps = {};

export const Default: Story = {
  args: { ...defaultArgs },
};
