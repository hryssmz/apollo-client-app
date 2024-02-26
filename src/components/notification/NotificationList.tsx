// components/notification/NotificationList.tsx
import List from "@mui/material/List";
import EmptyList from "../common/EmptyList";
import NotificationListItem from "./NotificationListItem";
import SvgReminders from "../svg/SvgReminders";
import type {
  MutationUpdateNotificationArgs,
  Notification,
} from "@/graphql/graphql";

export interface NotificationListProps {
  notifications: Pick<Notification, "id" | "message">[];
  updateNotification: (
    payload: MutationUpdateNotificationArgs["payload"]
  ) => void;
}

export default function NotificationList({
  notifications,
  updateNotification,
}: NotificationListProps) {
  return notifications.length > 0 ? (
    <List>
      {notifications.map(({ id, message }) => (
        <NotificationListItem
          key={id}
          id={id}
          message={message}
          userFullName="Somebody"
          updateNotification={updateNotification}
        />
      ))}
    </List>
  ) : (
    <EmptyList entity="Notifications">
      <SvgReminders style={{ height: 200, width: 250, marginBottom: 30 }} />
    </EmptyList>
  );
}
