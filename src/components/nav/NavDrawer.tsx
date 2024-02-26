// components/nav/NavDrawer.tsx
import { useSelector } from "@xstate/react";
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { formatAmount } from "@/utils/transaction";
import NavMainList from "./NavMainList";
import NavSecondaryList from "./NavSecondaryList";
import type { AuthActorRef } from "@/machines/authMachine";

const drawerWidth = 240;

export interface NavDrawerProps {
  closeMobileDrawer: () => void;
  toggleDrawer: () => void;
  drawerOpen: boolean;
  authActor: AuthActorRef;
}

export default function NavDrawer({
  toggleDrawer,
  closeMobileDrawer,
  drawerOpen,
  authActor,
}: NavDrawerProps) {
  const theme = useTheme();
  const authState = useSelector(authActor, state => state);
  const showTemporaryDrawer = useMediaQuery(theme.breakpoints.only("xs"));

  const currentUser = authState.context.user;
  const signOut = () =>
    authActor.send({ type: "LOGOUT", payload: { id: currentUser?.id ?? "" } });

  return (
    <Drawer
      variant={showTemporaryDrawer ? "temporary" : "persistent"}
      sx={{
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        ...(!drawerOpen && {
          mt: "50px",
          overflowX: "hidden",
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9),
          },
        }),
      }}
      open={drawerOpen}
      ModalProps={{
        onClose: (_event, reason) => {
          if (reason === "backdropClick") {
            closeMobileDrawer();
          }
        },
        closeAfterTransition: showTemporaryDrawer,
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={drawerOpen ? { padding: theme.spacing(2) } : { display: "none" }}
      >
        <Grid item>
          {currentUser && (
            <Avatar
              sx={{ mr: theme.spacing(2) }}
              alt={`${currentUser.firstName} ${currentUser.lastName}`}
              src={currentUser.avatar ?? undefined}
            />
          )}
        </Grid>
        <Grid item>
          {currentUser && (
            <>
              <Typography variant="subtitle1" color="text.primary">
                {currentUser.firstName} {currentUser.lastName.slice(0, 1)}
              </Typography>
              <Typography variant="subtitle2" color="inherit" gutterBottom>
                @{currentUser.username}
              </Typography>
            </>
          )}
        </Grid>
        <Grid item sx={{ width: "30%" }} />
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={drawerOpen ? { padding: theme.spacing(2) } : { display: "none" }}
      >
        <Grid item>
          {currentUser && (
            <>
              <Typography
                variant="h6"
                color="text.primary"
                sx={{ fontWeight: "bold" }}
              >
                {formatAmount(currentUser.balance)}
              </Typography>
              <Typography variant="subtitle2" color="inherit" gutterBottom>
                Account Balance
              </Typography>
            </>
          )}
        </Grid>
        <Grid item>
          <NavMainList
            showTemporaryDrawer={showTemporaryDrawer}
            toggleDrawer={toggleDrawer}
          />
        </Grid>
        <Grid item>
          <NavSecondaryList signOut={signOut} />
        </Grid>
      </Grid>
    </Drawer>
  );
}
