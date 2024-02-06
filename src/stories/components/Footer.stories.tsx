// stories/components/Footer.stories.tsx
import Footer from "@/components/Footer";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Footer> = {
  title: "components/Footer",
  component: Footer,
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {},
};
