// stories/components/user/UserSettingsContainer.stories.tsx
import { createActor } from "xstate";
import UserSettingsContainer from "@/components/user/UserSettingsContainer";
import { authMachine } from "@/machines/authMachine";
import { users } from "@/stories/data";
import type { Meta, StoryObj } from "@storybook/react";

function StoryComponent() {
  const authActor = createActor(authMachine, {
    snapshot: authMachine.resolveState({
      value: "authorized",
      context: {
        user: users[0],
      },
    }),
  }).start();
  return <UserSettingsContainer authActor={authActor} />;
}

const meta: Meta<typeof StoryComponent> = {
  title: "components/user/UserSettingsContainer",
  component: StoryComponent,
};

export default meta;

type Story = StoryObj<typeof StoryComponent>;

export const Default: Story = {
  args: {},
};
