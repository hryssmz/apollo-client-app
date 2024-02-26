// components/transaction/list/AmountRangeFilter.tsx
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import {
  formatAmount,
  formatAmountRange,
  formatAmountSlider,
} from "@/utils/transaction";

export interface AmountRangeFilterProps {
  filterAmountRange: ({
    amountMin,
    amountMax,
  }: {
    amountMin: number;
    amountMax: number;
  }) => void;
  amountMin?: number;
  amountMax?: number;
  resetAmountRange: () => void;
}

export default function AmountRangeFilter({
  amountMin,
  amountMax,
  filterAmountRange,
  resetAmountRange,
}: AmountRangeFilterProps) {
  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      spacing={1}
      sx={{ width: 300, m: "30px" }}
    >
      <Grid item>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Grid item sx={{ width: 225 }}>
            <Typography color="text.secondary">
              Amount Range:{" "}
              {amountMin !== undefined && amountMax !== undefined
                ? formatAmountRange(amountMin, amountMax)
                : "N/A"}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                resetAmountRange();
              }}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Slider
          value={[amountMin ?? 0, amountMax ?? 100]}
          min={0}
          max={100}
          step={1}
          onChange={(_event, value) => {
            if (typeof value !== "number") {
              filterAmountRange({ amountMin: value[0], amountMax: value[1] });
            }
          }}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaLabel={value => formatAmount(value * 1000)}
          valueLabelFormat={value => formatAmountSlider(value * 1000)}
        />
      </Grid>
    </Grid>
  );
}
