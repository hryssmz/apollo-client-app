// stories/components/svg/SvgReminders.stories.tsx
import SvgReminders from "@/components/svg/SvgReminders";
import type { Meta, StoryObj } from "@storybook/react";
import type { SvgRemindersProps } from "@/components/svg/SvgReminders";

const meta: Meta<typeof SvgReminders> = {
  title: "components/svg/SvgReminders",
  component: SvgReminders,
};

export default meta;

type Story = StoryObj<typeof SvgReminders>;

const defaultArgs: SvgRemindersProps = {};

export const Default: Story = {
  args: { ...defaultArgs },
};
