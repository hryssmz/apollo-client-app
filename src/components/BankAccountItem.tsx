// components/BankAccountItem.tsx
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import type { BankAccount } from "@/models";

export interface BankAccountItemProps {
  bankAccount: BankAccount;
  deleteBankAccount: ({ id }: Pick<BankAccount, "id">) => void;
}

export default function BankAccountListItem({
  bankAccount,
  deleteBankAccount,
}: BankAccountItemProps) {
  return (
    <ListItem>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Grid item>
          <Typography variant="body1" color="primary" gutterBottom>
            {bankAccount.bankName} {bankAccount.isDeleted && "(Deleted)"}
          </Typography>
        </Grid>
        {!bankAccount.isDeleted && (
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => {
                deleteBankAccount({ id: bankAccount.id });
              }}
            >
              Delete
            </Button>
          </Grid>
        )}
      </Grid>
    </ListItem>
  );
}
