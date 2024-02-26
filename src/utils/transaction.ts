// utils/transaction.ts
import Dinero from "dinero.js";

export const formatAmount = (amount: number) => Dinero({ amount }).toFormat();
export const formatAmountSlider = (amount: number) =>
  Dinero({ amount }).toFormat("$0,0");
export const formatAmountRange = (min: number, max: number) =>
  `${formatAmount(min * 1000)} - ${formatAmount(max * 1000)}`;
