// machines/snackbarMachine.ts
import { assertEvent, createActor, assign, setup } from "xstate";
import type { ActorRef, SnapshotFrom } from "xstate";
import type { AlertColor } from "@mui/material/Alert";

export interface SnackbarMachineContext {
  severity?: AlertColor;
  message?: string;
}

export type SnackbarMachineEvents =
  | { type: "SHOW"; severity?: AlertColor; message?: string }
  | { type: "HIDE" };

export const snackbarMachine = setup({
  types: {
    context: {} as SnackbarMachineContext,
    events: {} as SnackbarMachineEvents,
  },
  actions: {
    "set snackbar": assign(({ event }) => {
      assertEvent(event, "SHOW");
      const { type, ...rest } = event;
      return { ...rest };
    }),
  },
  delays: {
    "auto hide": 3000,
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5SwHYEMDGBrARmgTgHQCWKAbsbMTgDZgDEAygBIDyA6gNoAMAuoqAAOAeyoAXYsJQCQAD0QBGAJwAWQgFYVANgAcAdnUAaEAE9EOhRoC+V46ky4ChClVoNmASQAiAUR78kEBFxSWlA+QQFPSVjMwQAJn1CJXUAZgV49Rs7dGw8IhdqOnpZWDE0MTBCNAAzSvwAClTuFoBKens8p0K3fxlg4gkpGQiomNNEeO4dZLSMrOyQFGEIOBlOx3x+0UHQkcQAWi1Yw61FjfySckoisG2Q4fDEVPUZvQtMk4T4rUIp9My51ym2cNzc912j1AERU8S+GRmOnUCnUWkBNisQA */
  id: "snackbar",
  initial: "invisible",
  context: { severity: undefined, message: undefined },
  states: {
    invisible: {
      on: {
        SHOW: {
          description: "display snackbar",
          target: "visible",
          actions: "set snackbar",
        },
      },
    },
    visible: {
      after: {
        "auto hide": {
          description: "Auto hide snackbar",
          target: "invisible",
        },
      },
      on: {
        HIDE: {
          description: "Hide snackbar",
          target: "invisible",
        },
      },
    },
  },
});

export type SnackbarMachine = typeof snackbarMachine;
export type SnackbarSnapshot = SnapshotFrom<SnackbarMachine>;
export type SnackbarActorRef = ActorRef<
  SnackbarSnapshot,
  SnackbarMachineEvents
>;
