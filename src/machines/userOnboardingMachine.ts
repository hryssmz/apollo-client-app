// machines/userOnboardingMachine.ts
import { setup } from "xstate";

export interface UserOnboardingMachineContext {}

export type UserOnboardingMachineEvents = { type: "PREV" } | { type: "NEXT" };

export const userOnboardingMachine = setup({
  types: {
    context: {} as UserOnboardingMachineContext,
    events: {} as UserOnboardingMachineEvents,
  },
}).createMachine({
  id: "userOnboarding",
  initial: "stepOne",
  states: {
    stepOne: {
      on: {
        NEXT: "stepTwo",
      },
    },
    stepTwo: {
      on: {
        PREV: "stepOne",
        NEXT: "stepThree",
      },
    },
    stepThree: {
      on: {
        PREV: "stepTwo",
        NEXT: "done",
      },
    },
    done: {
      type: "final",
    },
  },
});
