// components/nav/NavSecondaryList.tsx
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export interface NavSecondaryListProps {
  signOut: () => void;
}

export default function NavSecondaryList({ signOut }: NavSecondaryListProps) {
  return (
    <List>
      <ListItem>
        <ListItemButton onClick={() => signOut()}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
