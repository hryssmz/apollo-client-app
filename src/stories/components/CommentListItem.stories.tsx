// stories/components/CommentListItem.stories.tsx
import CommentListItem from "@/components/CommentListItem";
import { comments } from "../data/comment";
import type { Meta, StoryObj } from "@storybook/react";
import type { CommentListItemProps } from "@/components/CommentListItem";

const meta: Meta<typeof CommentListItem> = {
  title: "components/CommentListItem",
  component: CommentListItem,
};

export default meta;

type Story = StoryObj<typeof CommentListItem>;

const defaultArgs: CommentListItemProps = {
  comment: comments[0],
};

export const Default: Story = {
  args: { ...defaultArgs },
};
