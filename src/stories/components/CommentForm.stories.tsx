// stories/components/CommentForm.stories.tsx
import CommentForm from "@/components/CommentForm";
import type { Meta, StoryObj } from "@storybook/react";
import type { CommentFormProps } from "@/components/CommentForm";

const meta: Meta<typeof CommentForm> = {
  title: "components/CommentForm",
  component: CommentForm,
};

export default meta;

type Story = StoryObj<typeof CommentForm>;

const defaultArgs: CommentFormProps = {
  transactionId: "",
  transactionComment: payload => {
    alert(JSON.stringify(payload, null, 2));
  },
};

export const Default: Story = {
  args: { ...defaultArgs },
};
