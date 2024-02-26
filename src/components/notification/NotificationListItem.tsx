// components/notification/NotificationListItem.tsx
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import CheckIcon from "@mui/icons-material/Check";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import type { MutationUpdateNotificationArgs } from "@/graphql/graphql";

export type NotificationMessage =
  | { type: "comment"; commentId: string }
  | { type: "like"; likeId: string }
  | { type: "payment"; status: "requested" | "received" };

export interface NotificationListItemProps {
  id: string;
  message: string;
  userFullName: string;
  updateNotification: (
    payload: MutationUpdateNotificationArgs["payload"]
  ) => void;
}

export default function NotificationListItem({
  id,
  message,
  userFullName,
  updateNotification,
}: NotificationListItemProps) {
  const theme = useTheme();
  const xsBreakpoint = useMediaQuery(theme.breakpoints.only("xs"));
  const messageObj: NotificationMessage = JSON.parse(message);
  const listItemIcon =
    messageObj.type === "comment" ? (
      <CommentRoundedIcon />
    ) : messageObj.type === "like" ? (
      <ThumbUpAltOutlinedIcon />
    ) : messageObj.type === "payment" && messageObj.status === "requested" ? (
      <PaymentIcon sx={{ color: "red" }} />
    ) : (
      <MonetizationOnIcon sx={{ color: "green" }} />
    );
  const listItemText =
    messageObj.type === "comment"
      ? `${userFullName} commented on a transaction.`
      : messageObj.type === "like"
      ? `${userFullName} liked a transaction.`
      : messageObj.type === "payment" && messageObj.status === "requested"
      ? `${userFullName} requested payment.`
      : `${userFullName} received payment.`;

  return (
    <ListItem>
      <ListItemIcon>{listItemIcon}</ListItemIcon>
      <ListItemText primary={listItemText} />
      {xsBreakpoint ? (
        <IconButton
          aria-label="mark as read"
          color="primary"
          onClick={() => {
            updateNotification({ id, isRead: true, userId: "" });
          }}
        >
          <CheckIcon />
        </IconButton>
      ) : (
        <Button
          color="primary"
          size="small"
          onClick={() => {
            updateNotification({ id, isRead: true, userId: "" });
          }}
        >
          Dismiss
        </Button>
      )}
    </ListItem>
  );
}
