// stories/components/svg/SvgCypressLogo.stories.tsx
import SvgCypressLogo from "@/components/svg/SvgCypressLogo";
import type { Meta, StoryObj } from "@storybook/react";
import type { SvgCypressLogoProps } from "@/components/svg/SvgCypressLogo";

const meta: Meta<typeof SvgCypressLogo> = {
  title: "components/svg/SvgCypressLogo",
  component: SvgCypressLogo,
};

export default meta;

type Story = StoryObj<typeof SvgCypressLogo>;

const defaultArgs: SvgCypressLogoProps = {};

export const Default: Story = {
  args: { ...defaultArgs },
};
