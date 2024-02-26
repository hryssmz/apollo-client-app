// components/bank-account/BankAccountItem.tsx
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import type { MutationDeleteBankAccountArgs } from "@/graphql/graphql";

export interface BankAccountItemProps {
  id: string;
  bankName: string;
  isDeleted: boolean;
  deleteBankAccount: (
    payload: MutationDeleteBankAccountArgs["payload"]
  ) => void;
}

export default function BankAccountListItem({
  id,
  bankName,
  isDeleted,
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
            {bankName} {isDeleted && "(Deleted)"}
          </Typography>
        </Grid>
        {!isDeleted && (
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => {
                deleteBankAccount({ id });
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
