// stories/components/notification/NotificationListItem.stories.tsx
import NotificationListItem from "@/components/notification/NotificationListItem";
import { notifications, users } from "@/stories/data";
import type { Meta, StoryObj } from "@storybook/react";
import type {
  NotificationListItemProps,
  NotificationMessage,
} from "@/components/notification/NotificationListItem";

const meta: Meta<typeof NotificationListItem> = {
  title: "components/notification/NotificationListItem",
  component: NotificationListItem,
};

export default meta;

type Story = StoryObj<typeof NotificationListItem>;

const paymentRequestedIndex = notifications.findIndex(({ message }) => {
  const messageObj = JSON.parse(message) as NotificationMessage;
  return messageObj.type === "payment" && messageObj.status === "requested";
});

const paymentReceivedIndex = notifications.findIndex(({ message }) => {
  const messageObj = JSON.parse(message) as NotificationMessage;
  return messageObj.type === "payment" && messageObj.status === "received";
});

const commentIndex = notifications.findIndex(({ message }) => {
  const messageObj = JSON.parse(message) as NotificationMessage;
  return messageObj.type === "comment";
});

const likeIndex = notifications.findIndex(({ message }) => {
  const messageObj = JSON.parse(message) as NotificationMessage;
  return messageObj.type === "like";
});

const defaultArgs: NotificationListItemProps = {
  id: notifications[paymentRequestedIndex].id,
  message: notifications[paymentRequestedIndex].message,
  userFullName: `${users[0].firstName} ${users[0].lastName}`,
  updateNotification: payload => {
    alert(`Update notification: ${JSON.stringify(payload, null, 2)}`);
  },
};

export const PaymentRequested: Story = {
  args: { ...defaultArgs },
};

export const PaymentReceived: Story = {
  args: {
    ...defaultArgs,
    id: notifications[paymentReceivedIndex].id,
    message: notifications[paymentReceivedIndex].message,
  },
};

export const Comment: Story = {
  args: {
    ...defaultArgs,
    id: notifications[commentIndex].id,
    message: notifications[commentIndex].message,
  },
};

export const Like: Story = {
  args: {
    ...defaultArgs,
    id: notifications[likeIndex].id,
    message: notifications[likeIndex].message,
  },
};
