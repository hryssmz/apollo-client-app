// components/transaction/list/DateRangePicker.tsx
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

export interface DateRangePickerProps {
  filterDateRange: ({
    dateStart,
    dateEnd,
  }: {
    dateStart?: number;
    dateEnd?: number;
  }) => void;
  dateStart?: number;
  dateEnd?: number;
}

export default function DateRangePicker({
  filterDateRange,
  dateStart,
  dateEnd,
}: DateRangePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DemoContainer components={["DatePicker", "DatePicker"]} sx={{ mt: 2 }}>
        <DatePicker
          label="Date start"
          value={dateStart}
          onChange={newValue =>
            filterDateRange({ dateStart: newValue ?? undefined, dateEnd })
          }
        />
        <DatePicker
          label="Date end"
          value={dateEnd}
          onChange={newValue =>
            filterDateRange({ dateStart, dateEnd: newValue ?? undefined })
          }
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
