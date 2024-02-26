// components/notification/NotificationsContainer.tsx
import { useEffect } from "react";
import { useSelector } from "@xstate/react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import NotificationList from "./NotificationList";
import type { AuthSnapshot } from "@/machines/authMachine";
import type { NotificationsActorRef } from "@/machines/notificationsMachine";

export interface NotificationsContainerProps {
  authState: AuthSnapshot;
  notificationsActor: NotificationsActorRef;
}

export default function NotificationsContainer({
  authState,
  notificationsActor,
}: NotificationsContainerProps) {
  const user = authState.context.user!;
  const notificationsState = useSelector(
    notificationsActor,
    snapshot => snapshot
  );

  useEffect(() => {
    notificationsActor.send({ type: "FETCH", userId: user.id });
  }, [authState, notificationsActor]);

  return (
    <Paper
      sx={{
        minHeight: "90vh",
        p: 2,
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
      }}
    >
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Notifications
      </Typography>
      <NotificationList
        notifications={notificationsState.context.results}
        updateNotification={payload => {
          notificationsActor.send({ type: "UPDATE", payload });
        }}
      />
    </Paper>
  );
}
