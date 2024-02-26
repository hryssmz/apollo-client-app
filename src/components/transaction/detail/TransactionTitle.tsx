// components/transaction/detail/TransactionTitle.tsx
import { styled } from "@mui/material/styles";
import MuiTypography from "@mui/material/Typography";
import type { TypographyProps } from "@mui/material/Typography";

export interface TransactionTitleProps {
  requestStatus: string;
  senderName: string;
  receiverName: string;
}

const Typography = styled(MuiTypography)<TypographyProps>(({ theme }) => ({
  fontSize: 18,
  [theme.breakpoints.down("sm")]: {
    fontSize: theme.typography.fontSize,
  },
}));

export default function TransactionTitle({
  requestStatus,
  senderName,
  receiverName,
}: TransactionTitleProps) {
  return (
    <Typography color="text.secondary" gutterBottom>
      <Typography display="inline" component="span">
        {senderName}
      </Typography>
      <Typography display="inline" component="span" sx={{ color: "red" }}>
        {` ${
          requestStatus === ""
            ? "paid"
            : requestStatus === "accepted"
            ? "charged"
            : "requested"
        } `}
      </Typography>
      <Typography display="inline" component="span">
        {receiverName}
      </Typography>
    </Typography>
  );
}
