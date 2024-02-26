// components/nav/NavMainList.tsx
import { Link as RouterLink } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";

export interface NavMainListProps {
  toggleDrawer: () => void;
  showTemporaryDrawer: boolean;
}

export default function NavMainList({
  toggleDrawer,
  showTemporaryDrawer,
}: NavMainListProps) {
  const items = [
    { to: "/", icon: <HomeIcon />, text: "Home" },
    { to: "/user/settings", icon: <PersonIcon />, text: "My Account" },
    {
      to: "/bankaccounts",
      icon: <AccountBalanceIcon />,
      text: "Bank Accounts",
    },
    {
      to: "/notifications",
      icon: <NotificationsIcon />,
      text: "Notifications",
    },
  ];
  return (
    <List>
      {items.map(({ to, icon, text }) => (
        <ListItem key={to}>
          <ListItemButton
            onClick={() => showTemporaryDrawer && toggleDrawer()}
            component={RouterLink}
            to={to}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
