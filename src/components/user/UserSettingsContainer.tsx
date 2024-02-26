// components/user/UserSettingsContainer.tsx
import { useSelector } from "@xstate/react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SvgPersonalSettings from "@/components/svg/SvgPersonalSettings";
import UserSettingsForm from "./UserSettingsForm";
import type { AuthActorRef } from "@/machines/authMachine";

export interface UserSettingsContainerProps {
  authActor: AuthActorRef;
}

export default function UserSettingsContainer({
  authActor,
}: UserSettingsContainerProps) {
  const authState = useSelector(authActor, snapshot => snapshot);
  const currentUser = authState.context.user;

  return (
    <Paper
      sx={{ p: 2, display: "flex", overflow: "auto", flexDirection: "column" }}
    >
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        User Settings
      </Typography>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item>
          <SvgPersonalSettings style={{ height: 200, width: 300 }} />
        </Grid>
        <Grid item sx={{ width: "50%" }}>
          {currentUser && (
            <UserSettingsForm
              user={currentUser}
              updateUser={payload => {
                authActor.send({ type: "UPDATE", payload });
              }}
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
