// components/NavBar.tsx
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import useMediaQuery from "@mui/material/useMediaQuery";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TransactionNavTabs from "./TransactionNavTabs";
import RWALogo from "./SvgRwaLogo";
import RWAIconLogo from "./SvgRwaIconLogo";
import type { NotificationsSnapshot } from "@/machines/notificationsMachine";

const drawerWidth = 240;

export interface NavBarProps {
  drawerOpen: boolean;
  toggleDrawer: () => void;
  notificationsState: NotificationsSnapshot;
}

export default function NavBar({
  drawerOpen,
  toggleDrawer,
  notificationsState,
}: NavBarProps) {
  const location = useLocation();
  const theme = useTheme();
  const xsBreakpoint = useMediaQuery(theme.breakpoints.only("xs"));
  const allNotifications = notificationsState.context.results;
  const showNavTabs =
    location.pathname === "/" ||
    /\/(?:public|contacts|personal)/.test(location.pathname);

  return (
    <AppBar
      position="absolute"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(drawerOpen && {
          ml: `${drawerWidth}px`,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      }}
    >
      <Toolbar sx={{ pr: 3 }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => toggleDrawer()}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{
            flexGrow: 1,
            textAlign: "center",
          }}
        >
          <Link
            to="/"
            sx={{ color: "#fff", textDecoration: "none" }}
            component={RouterLink}
          >
            {xsBreakpoint ? (
              <RWAIconLogo
                style={{ color: "white", verticalAlign: "bottom" }}
              />
            ) : (
              <RWALogo style={{ color: "white", verticalAlign: "bottom" }} />
            )}
          </Link>
        </Typography>
        <Button
          sx={{
            fontSize: 16,
            bgcolor: "#00C853",
            pt: "5px",
            pb: "5px",
            pr: "20px",
            fontWeight: "bold",
            "&:hover": {
              bgcolor: "#4CAF50",
              borderColor: "#00C853",
              boxShadow: "none",
            },
          }}
          variant="contained"
          color="inherit"
          component={RouterLink}
          to="/transaction/new"
        >
          <AttachMoneyIcon /> New
        </Button>
        <IconButton color="inherit" component={RouterLink} to="/notifications">
          <Badge badgeContent={allNotifications.length} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Toolbar>
      {showNavTabs && <TransactionNavTabs />}
    </AppBar>
  );
}
