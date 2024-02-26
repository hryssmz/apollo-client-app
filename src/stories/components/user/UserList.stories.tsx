// stories/components/user/UserList.stories.tsx
import UserList from "@/components/user/UserList";
import { users } from "@/stories/data";
import type { Meta, StoryObj } from "@storybook/react";
import type { UserListProps } from "@/components/user/UserList";

const meta: Meta<typeof UserList> = {
  title: "components/user/UserList",
  component: UserList,
};

export default meta;

type Story = StoryObj<typeof UserList>;

const defaultArgs: UserListProps = {
  users: users.slice(0),
  setReceiver: user => {
    alert(`set receiver: ${JSON.stringify(user, null, 2)}`);
  },
};

export const Default: Story = {
  args: { ...defaultArgs },
};
