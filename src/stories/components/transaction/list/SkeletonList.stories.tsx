// stories/components/transaction/list/SkeletonList.stories.tsx
import SkeletonList from "@/components/transaction/list/SkeletonList";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SkeletonList> = {
  title: "components/transaction/list/SkeletonList",
  component: SkeletonList,
};

export default meta;

type Story = StoryObj<typeof SkeletonList>;

export const Default: Story = {
  args: {},
};
