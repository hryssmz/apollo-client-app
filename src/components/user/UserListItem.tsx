// components/user/UserListItem.tsx
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import type { User } from "@/graphql/graphql";

export interface UserListItemProps {
  user: User;
  setReceiver: (user: User) => void;
}

export default function UserListItem({ user, setReceiver }: UserListItemProps) {
  return (
    <ListItem onClick={() => setReceiver(user)}>
      <ListItemAvatar>
        <Avatar src={user.avatar ?? undefined} />
      </ListItemAvatar>
      <ListItemText
        primary={`${user.firstName} ${user.lastName}`}
        secondary={
          <span>
            <Grid
              component="span"
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={1}
            >
              <Grid item component="span">
                <b>U: </b>
                {user.username}
              </Grid>
              <Grid item component="span">
                &bull;
              </Grid>
              <Grid item component="span">
                <b>E: </b>
                {user.email ?? "N/A"}
              </Grid>
              <Grid item component="span">
                &bull;
              </Grid>
              <Grid item component="span">
                <b>P: </b>
                {user.phoneNumber ?? "N/A"}
              </Grid>
            </Grid>
          </span>
        }
      />
    </ListItem>
  );
}
