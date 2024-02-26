// components/transaction/list/TransactionDateRangeFilter.tsx
import { useState } from "react";
import { format } from "date-fns";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Drawer from "@mui/material/Drawer";
import Popover from "@mui/material/Popover";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CancelIcon from "@mui/icons-material/Cancel";
import DateRangePicker from "./DateRangePicker";

export interface TransactionDateRangeFilterProps {
  filterDateRange: ({
    dateStart,
    dateEnd,
  }: {
    dateStart?: number;
    dateEnd?: number;
  }) => void;
  resetDateRange: () => void;
  dateStart?: number;
  dateEnd?: number;
}

export default function TransactionDateRangeFilter({
  filterDateRange,
  resetDateRange,
  dateStart,
  dateEnd,
}: TransactionDateRangeFilterProps) {
  const theme = useTheme();
  const xsBreakpoint = useMediaQuery(theme.breakpoints.only("xs"));
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const queryHasDateFields = dateStart !== undefined && dateEnd !== undefined;
  const dateRangeOpen = !!anchorEl;
  const dateRangeId = dateRangeOpen ? "date-range-popover" : undefined;

  const formatDate = (d: number) => format(new Date(d), "MMM, d yyyy");

  const handleDateRangeClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDateRangeClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {queryHasDateFields ? (
        <Chip
          color="primary"
          variant="outlined"
          label={`Date: ${formatDate(dateStart)} - ${formatDate(dateEnd)}`}
          deleteIcon={<CancelIcon />}
          onClick={handleDateRangeClick}
          onDelete={() => {
            resetDateRange();
          }}
        />
      ) : (
        <Chip
          color="primary"
          variant="outlined"
          label="Date: ALL"
          deleteIcon={<ArrowDropDownIcon />}
          onClick={handleDateRangeClick}
          onDelete={handleDateRangeClick}
        />
      )}
      {xsBreakpoint ? (
        <Drawer
          id={dateRangeId}
          open={dateRangeOpen}
          anchor="bottom"
          ModalProps={{ onClose: handleDateRangeClose }}
        >
          <Button onClick={handleDateRangeClose}>Close</Button>
          <DateRangePicker
            filterDateRange={filterDateRange}
            dateStart={dateStart ?? new Date().getTime()}
            dateEnd={dateEnd ?? new Date().getTime()}
          />
        </Drawer>
      ) : (
        <Popover
          id={dateRangeId}
          open={dateRangeOpen}
          onClose={handleDateRangeClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          sx={{
            [theme.breakpoints.down("sm")]: {
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            },
          }}
          anchorEl={anchorEl}
        >
          <DateRangePicker
            filterDateRange={filterDateRange}
            dateStart={dateStart ?? new Date().getTime()}
            dateEnd={dateEnd ?? new Date().getTime()}
          />
        </Popover>
      )}
    </div>
  );
}
