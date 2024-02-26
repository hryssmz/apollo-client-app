// stories/components/svg/SvgPersonalSettings.stories.tsx
import SvgPersonalSettings from "@/components/svg/SvgPersonalSettings";
import type { Meta, StoryObj } from "@storybook/react";
import type { SvgPersonalSettingsProps } from "@/components/svg/SvgPersonalSettings";

const meta: Meta<typeof SvgPersonalSettings> = {
  title: "components/svg/SvgPersonalSettings",
  component: SvgPersonalSettings,
};

export default meta;

type Story = StoryObj<typeof SvgPersonalSettings>;

const defaultArgs: SvgPersonalSettingsProps = {};

export const Default: Story = {
  args: { ...defaultArgs },
};
