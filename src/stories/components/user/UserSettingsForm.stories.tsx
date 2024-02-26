// stories/components/user/UserSettingsForm.stories.tsx
import UserSettingsForm from "@/components/user/UserSettingsForm";
import { users } from "@/stories/data";
import type { Meta, StoryObj } from "@storybook/react";
import type { UserSettingsFormProps } from "@/components/user/UserSettingsForm";

const meta: Meta<typeof UserSettingsForm> = {
  title: "components/user/UserSettingsForm",
  component: UserSettingsForm,
};

export default meta;

type Story = StoryObj<typeof UserSettingsForm>;

const defaultArgs: UserSettingsFormProps = {
  user: users[0],
  updateUser: payload => {
    alert(`Update user: ${JSON.stringify(payload, null, 2)}`);
  },
};

export const Default: Story = {
  args: { ...defaultArgs },
};
