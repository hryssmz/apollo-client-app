// stories/components/comment/CommentList.stories.tsx
import CommentList from "@/components/comment/CommentList";
import { comments } from "@/stories/data";
import type { Meta, StoryObj } from "@storybook/react";
import type { CommentListProps } from "@/components/comment/CommentList";

const meta: Meta<typeof CommentList> = {
  title: "components/comment/CommentList",
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
