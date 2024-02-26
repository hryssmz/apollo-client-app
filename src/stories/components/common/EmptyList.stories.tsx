// stories/components/common/EmptyList.stories.tsx
import EmptyList from "@/components/common/EmptyList";
import type { Meta, StoryObj } from "@storybook/react";
import type { EmptyListProps } from "@/components/common/EmptyList";

const meta: Meta<typeof EmptyList> = {
  title: "components/common/EmptyList",
  component: EmptyList,
};

export default meta;

type Story = StoryObj<typeof EmptyList>;

const defaultArgs: EmptyListProps = {
  entity: "Bank Accounts",
  children: <input />,
};

export const Default: Story = {
  args: { ...defaultArgs },
};

export const NoChildren: Story = {
  args: { ...defaultArgs, children: undefined },
};
