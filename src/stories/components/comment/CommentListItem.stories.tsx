// stories/components/comment/CommentListItem.stories.tsx
import CommentListItem from "@/components/comment/CommentListItem";
import { comments } from "@/stories/data";
import type { Meta, StoryObj } from "@storybook/react";
import type { CommentListItemProps } from "@/components/comment/CommentListItem";

const meta: Meta<typeof CommentListItem> = {
  title: "components/comment/CommentListItem",
  component: CommentListItem,
};

export default meta;

type Story = StoryObj<typeof CommentListItem>;

const defaultArgs: CommentListItemProps = {
  content: comments[0].content,
};

export const Default: Story = {
  args: { ...defaultArgs },
};
