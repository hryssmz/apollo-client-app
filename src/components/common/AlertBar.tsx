// components/common/AlertBar.tsx
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import type { SnackbarSnapshot } from "@/machines/snackbarMachine";

export interface AlertBarProps {
  snackbarState: SnackbarSnapshot;
}

export default function AlertBar({ snackbarState }: AlertBarProps) {
  const open = snackbarState.matches("visible");
  const { severity, message } = snackbarState.context;
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={open}
    >
      <Alert elevation={6} variant="filled" severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}
