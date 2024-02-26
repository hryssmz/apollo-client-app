// machines/transactionFiltersMachine.ts
import { assertEvent, assign, setup } from "xstate";
import type { ActorRef, SnapshotFrom } from "xstate";

export interface TransactionFiltersMachineContext {
  dateStart?: number;
  dateEnd?: number;
  amountMin?: number;
  amountMax?: number;
}

export type TransactionFiltersMachineEvents =
  | { type: "DATE_FILTER"; dateStart?: number; dateEnd?: number }
  | { type: "AMOUNT_FILTER"; amountMin: number; amountMax: number }
  | { type: "DATE_RESET" }
  | { type: "AMOUNT_RESET" };

export const transactionFiltersMachine = setup({
  types: {
    context: {} as TransactionFiltersMachineContext,
    events: {} as TransactionFiltersMachineEvents,
  },
  actions: {
    "set date range": assign(({ event }) => {
      assertEvent(event, "DATE_FILTER");
      return { dateStart: event.dateStart, dateEnd: event.dateEnd };
    }),
    "reset date range": assign({ dateStart: undefined, dateEnd: undefined }),
    "set amount range": assign(({ event }) => {
      assertEvent(event, "AMOUNT_FILTER");
      return { amountMin: event.amountMin, amountMax: event.amountMax };
    }),
    "reset amount range": assign({
      amountMin: undefined,
      amountMax: undefined,
    }),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBcBOBDAdrdBjZAlgPaYBiBANsmKrAHQTrUBKWMAxACICCAKgKIB9UgEkAMgOYBtAAwBdRKAAORWAUIlFIAB6IArADY6egMwBGAEx6ANCACeiMwHYndACymzJg3rcAOMwMnNzcAX1DbNCwcfGIySmpaBiYwVkwOHgFBZn4AZX5eWQUkEBU1DUwtXQQ9GTo-CxlzK1sHBADjGS6zM18AoLcLcMiMbDwK8ioaenQAWyIAV0xkNI5uAFkAeQBVADleYXFJIq0y9TiqxA9jXwM-Jxt7K5MLer0ATjcZMz8ZA3fDHphiAomNYiRJokZvMlis2GB2BsdvtsnkCicSmcKpcEINWogTN46O8-hYnHc-gCfOEIiBMEQIHAtKCYhMEtNTqpzpoStUALQGfEIAXAlnjOKQ6bJFjwznlC68xD-eokgwtJ4IMl+dykgy9fyBYJhWli8HxKZJOaLZarMBy7mVRU1bW1JwBdVtUwmeqWPQWCn-QE00JAA */
  id: "transactionFilters",
  type: "parallel",
  context: {
    dateStart: undefined,
    dateEnd: undefined,
    amountMin: undefined,
    amountMax: undefined,
  },
  states: {
    dateRange: {
      on: {
        DATE_FILTER: {
          actions: "set date range",
        },
        DATE_RESET: {
          actions: "reset date range",
        },
      },
    },
    amountRange: {
      on: {
        AMOUNT_FILTER: {
          actions: "set amount range",
        },
        AMOUNT_RESET: {
          actions: "reset amount range",
        },
      },
    },
  },
});

export type TransactionFiltersMachine = typeof transactionFiltersMachine;
export type TransactionFiltersSnapshot =
  SnapshotFrom<TransactionFiltersMachine>;
export type TransactionFiltersActorRef = ActorRef<
  TransactionFiltersSnapshot,
  TransactionFiltersMachineEvents
>;
