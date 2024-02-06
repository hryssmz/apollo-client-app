// stories/components/SvgRwaIconLogo.stories.tsx
import SvgRwaIconLogo from "@/components/SvgRwaIconLogo";
import type { Meta, StoryObj } from "@storybook/react";
import type { SvgRwaIconLogoProps } from "@/components/SvgRwaIconLogo";

const meta: Meta<typeof SvgRwaIconLogo> = {
  title: "components/SvgRwaIconLogo",
  component: SvgRwaIconLogo,
};

export default meta;

type Story = StoryObj<typeof SvgRwaIconLogo>;

const defaultArgs: SvgRwaIconLogoProps = {};

export const Default: Story = {
  args: { ...defaultArgs },
};
