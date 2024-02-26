// components/transaction/list/TransactionFilters.tsx
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TransactionAmountRangeFilter from "./TransactionAmountRangeFilter";
import TransactionDateRangeFilter from "./TransactionDateRangeFilter";

export interface TransactionFiltersProps {
  dateStart?: number;
  dateEnd?: number;
  amountMin?: number;
  amountMax?: number;
  filterDateRange: ({
    dateStart,
    dateEnd,
  }: {
    dateStart?: number;
    dateEnd?: number;
  }) => void;
  resetDateRange: () => void;
  filterAmountRange: ({
    amountMin,
    amountMax,
  }: {
    amountMin: number;
    amountMax: number;
  }) => void;
  resetAmountRange: () => void;
}

export default function TransactionFilters({
  dateStart,
  dateEnd,
  amountMin,
  amountMax,
  filterDateRange,
  resetDateRange,
  filterAmountRange,
  resetAmountRange,
}: TransactionFiltersProps) {
  return (
    <Paper
      elevation={0}
      sx={{ p: 2, display: "flex", overflow: "auto", flexDirection: "column" }}
    >
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={1}
      >
        <Grid item>
          <TransactionDateRangeFilter
            dateStart={dateStart}
            dateEnd={dateEnd}
            filterDateRange={filterDateRange}
            resetDateRange={resetDateRange}
          />
        </Grid>
        <Grid item>
          <TransactionAmountRangeFilter
            amountMin={amountMin}
            amountMax={amountMax}
            filterAmountRange={filterAmountRange}
            resetAmountRange={resetAmountRange}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
