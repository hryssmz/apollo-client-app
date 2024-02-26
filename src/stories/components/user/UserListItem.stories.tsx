// stories/components/user/UserListItem.stories.tsx
import UserListItem from "@/components/user/UserListItem";
import { users } from "@/stories/data";
import type { Meta, StoryObj } from "@storybook/react";
import type { UserListItemProps } from "@/components/user/UserListItem";

const meta: Meta<typeof UserListItem> = {
  title: "components/user/UserListItem",
  component: UserListItem,
};

export default meta;

type Story = StoryObj<typeof UserListItem>;

const defaultArgs: UserListItemProps = {
  user: users[0],
  setReceiver: user => {
    alert(`set receiver: ${JSON.stringify(user, null, 2)}`);
  },
};

export const Default: Story = {
  args: { ...defaultArgs },
};
