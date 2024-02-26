// components/transaction/create/NumberFormatCustom.tsx
import { forwardRef } from "react";
import { NumericFormat } from "react-number-format";

export interface NumberFormatCustomProps {
  onChange: (event: { target: { value: string } }) => void;
}

export default forwardRef(function NumberFormatCustom(
  { onChange }: NumberFormatCustomProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <NumericFormat
      getInputRef={ref}
      onValueChange={values => {
        onChange({ target: { value: values.value } });
      }}
      thousandSeparator
      valueIsNumericString
      prefix="$"
    />
  );
});
