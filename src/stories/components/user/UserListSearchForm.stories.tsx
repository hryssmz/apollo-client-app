// stories/components/user/UserListSearchForm.stories.tsx
import UserListSearchForm from "@/components/user/UserListSearchForm";
import type { Meta, StoryObj } from "@storybook/react";
import type { UserListSearchFormProps } from "@/components/user/UserListSearchForm";

const meta: Meta<typeof UserListSearchForm> = {
  title: "components/user/UserListSearchForm",
  component: UserListSearchForm,
};

export default meta;

type Story = StoryObj<typeof UserListSearchForm>;

const defaultArgs: UserListSearchFormProps = {
  userListSearch: ({ q }) => {
    console.log(q);
  },
};

export const Default: Story = {
  args: { ...defaultArgs },
};
