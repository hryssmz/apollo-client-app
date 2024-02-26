// components/transaction/list/TransactionList.tsx
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ListSubheader from "@mui/material/ListSubheader";
import Paper from "@mui/material/Paper";
import EmptyList from "../../common/EmptyList";
import SkeletonList from "./SkeletonList";
import SvgTransferMoney from "../../svg/SvgTransferMoney";
import TransactionInfiniteList from "./TransactionInfiniteList";
import type { PageData, TransactionDetail } from "@/graphql/graphql";

export interface TransactionListProps {
  header: string;
  isLoading: boolean;
  filterComponent: React.ReactNode;
  showCreateButton: boolean;
  transactions: TransactionDetail[];
  pageData?: PageData;
  loadNextPage: (page: number) => void;
}

export default function TransactionList({
  header,
  isLoading,
  filterComponent,
  transactions,
  pageData,
  loadNextPage,
  showCreateButton,
}: TransactionListProps) {
  return (
    <Paper sx={{ pl: 1 }}>
      {filterComponent}
      <ListSubheader component="div">{header}</ListSubheader>
      {isLoading ? (
        <SkeletonList />
      ) : transactions.length > 0 && pageData ? (
        <TransactionInfiniteList
          transactions={transactions}
          pageData={pageData}
          loadNextPage={loadNextPage}
        />
      ) : (
        <EmptyList entity="Transactions">
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%" }}
            spacing={2}
          >
            <Grid item>
              <SvgTransferMoney
                style={{ height: 200, width: 300, marginBottom: 30 }}
              />
            </Grid>
            <Grid item>
              {showCreateButton && (
                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/transaction/new"
                >
                  Create A Transaction
                </Button>
              )}
            </Grid>
          </Grid>
        </EmptyList>
      )}
    </Paper>
  );
}
