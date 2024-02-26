// components/transaction/list/TransactionAmountRangeFilter.tsx
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Drawer from "@mui/material/Drawer";
import Popover from "@mui/material/Popover";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AmountRangeFilter from "./AmountRangeFilter";
import { formatAmountRange } from "@/utils/transaction";

export interface TransactionAmountRangeFilterProps {
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

export default function TransactionAmountRangeFilter({
  amountMin,
  amountMax,
  filterAmountRange,
  resetAmountRange,
}: TransactionAmountRangeFilterProps) {
  const theme = useTheme();
  const xsBreakpoint = useMediaQuery(theme.breakpoints.only("xs"));
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const amountRangeOpen = !!anchorEl;
  const amountRangeId = amountRangeOpen ? "amount-range-popover" : undefined;

  const handleAmountRangeClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAmountRangeClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Chip
        color="primary"
        variant="outlined"
        onClick={handleAmountRangeClick}
        label={`Amount: ${
          amountMin !== undefined && amountMax !== undefined
            ? formatAmountRange(amountMin, amountMax)
            : "N/A"
        }`}
        deleteIcon={<ArrowDropDownIcon />}
        onDelete={handleAmountRangeClick}
      />
      {xsBreakpoint ? (
        <Drawer
          id={amountRangeId}
          open={amountRangeOpen}
          ModalProps={{ onClose: handleAmountRangeClose }}
          anchor="bottom"
        >
          <Button onClick={() => handleAmountRangeClose()}>Close</Button>
          <AmountRangeFilter
            filterAmountRange={filterAmountRange}
            resetAmountRange={resetAmountRange}
            amountMin={amountMin}
            amountMax={amountMax}
          />
        </Drawer>
      ) : (
        <Popover
          id={amountRangeId}
          open={amountRangeOpen}
          anchorEl={anchorEl}
          onClose={handleAmountRangeClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <AmountRangeFilter
            filterAmountRange={filterAmountRange}
            resetAmountRange={resetAmountRange}
            amountMin={amountMin}
            amountMax={amountMax}
          />
        </Popover>
      )}
    </div>
  );
}
