// stories/components/CommentList.stories.tsx
import CommentList from "@/components/CommentList";
import { comments } from "@/stories/data/comment";
import type { Meta, StoryObj } from "@storybook/react";
import type { CommentListProps } from "@/components/CommentList";

const meta: Meta<typeof CommentList> = {
  title: "components/CommentList",
  component: CommentList,
};

export default meta;

type Story = StoryObj<typeof CommentList>;

const defaultArgs: CommentListProps = {
  comments: [...comments],
};

export const Default: Story = {
  args: { ...defaultArgs },
};

export const Empty: Story = {
  args: { comments: [] },
};
