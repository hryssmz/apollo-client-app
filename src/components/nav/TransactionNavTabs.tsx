// components/nav/TransactionNavTabs.tsx
import { Link, useLocation } from "react-router-dom";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

export default function TransactionNavTabs() {
  const location = useLocation();
  const linkMap: Record<string, number> = {
    "/contacts": 1,
    "/personal": 2,
  };
  const value = linkMap[location.pathname] ?? 0;

  return (
    <Tabs value={value} indicatorColor="secondary" centered>
      <Tab label="Everyone" component={Link} to="/" />
      <Tab label="Friends" component={Link} to="/contacts" />
      <Tab label="Mine" component={Link} to="/personal" />
    </Tabs>
  );
}
