// stories/components/notification/NotificationList.stories.tsx
import NotificationList from "@/components/notification/NotificationList";
import { notifications } from "@/stories/data";
import type { Meta, StoryObj } from "@storybook/react";
import type { NotificationListProps } from "@/components/notification/NotificationList";

const meta: Meta<typeof NotificationList> = {
  title: "components/notification/NotificationList",
  component: NotificationList,
};

export default meta;

type Story = StoryObj<typeof NotificationList>;

const defaultArgs: NotificationListProps = {
  notifications: notifications.slice(0, 10),
  updateNotification: payload => {
    alert(`Update notification: ${JSON.stringify(payload, null, 2)}`);
  },
};

export const Default: Story = {
  args: { ...defaultArgs },
};

export const Empty: Story = {
  args: { ...defaultArgs, notifications: [] },
};
