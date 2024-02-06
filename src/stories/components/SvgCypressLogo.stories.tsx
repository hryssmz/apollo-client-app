// stories/components/SvgCypressLogo.stories.tsx
import SvgCypressLogo from "@/components/SvgCypressLogo";
import type { Meta, StoryObj } from "@storybook/react";
import type { SvgCypressLogoProps } from "@/components/SvgCypressLogo";

const meta: Meta<typeof SvgCypressLogo> = {
  title: "components/SvgCypressLogo",
  component: SvgCypressLogo,
};

export default meta;

type Story = StoryObj<typeof SvgCypressLogo>;

const defaultArgs: SvgCypressLogoProps = {};

export const Default: Story = {
  args: { ...defaultArgs },
};
