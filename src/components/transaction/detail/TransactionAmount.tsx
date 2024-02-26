// components/transaction/detail/TransactionAmount.tsx
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { formatAmount } from "@/utils/transaction";

export interface TransactionAmountProps {
  requestStatus: string;
  amount: number;
}

export default function TransactionAmount({
  requestStatus,
  amount,
}: TransactionAmountProps) {
  const theme = useTheme();
  const isRequestTransaction = requestStatus !== "";
  return (
    <Typography
      display="inline"
      component="span"
      color="primary"
      sx={{
        fontSize: 24,
        color: isRequestTransaction ? "#4CAF50" : "red",
        [theme.breakpoints.down("sm")]: {
          fontSize: theme.typography.body1.fontSize,
        },
      }}
    >
      {`${isRequestTransaction ? "+" : "-"}${formatAmount(amount)}`}
    </Typography>
  );
}
