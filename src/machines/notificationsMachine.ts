// machines/notificationsMachine.ts
import { assertEvent, assign, fromPromise, setup } from "xstate";
import { api } from "@/utils/axios";
import { GET_UNREAD_NOTIFICATIONS, UPDATE_NOTIFICATION } from "@/queries";
import type { ActorRef, SnapshotFrom } from "xstate";
import type {
  Mutation,
  MutationUpdateNotificationArgs,
  Notification,
  Query,
  QueryGetUnreadNotificationsArgs,
} from "@/graphql/graphql";

export interface NotificationsMachineContext {
  results: Notification[];
}

export type NotificationsMachineEvents =
  | ({ type: "FETCH" } & QueryGetUnreadNotificationsArgs)
  | ({ type: "UPDATE" } & MutationUpdateNotificationArgs)
  | { type: "xstate.done.actor.loading"; output: Notification[] }
  | { type: "xstate.done.actor.updating"; output: Notification };

export const notificationsMachine = setup({
  types: {
    context: {} as NotificationsMachineContext,
    events: {} as NotificationsMachineEvents,
  },
  actors: {
    "fetch data": fromPromise(
      async ({ input }: { input: QueryGetUnreadNotificationsArgs }) => {
        const response = await api.post<{
          data: Pick<Query, "getUnreadNotifications">;
        }>("/graphql", { query: GET_UNREAD_NOTIFICATIONS, variables: input });
        return response.data.data.getUnreadNotifications;
      }
    ),
    "update data": fromPromise(
      async ({ input }: { input: MutationUpdateNotificationArgs }) => {
        const response = await api.post<{
          data: Pick<Mutation, "updateNotification">;
        }>("/graphql", { query: UPDATE_NOTIFICATION, variables: input });
        return response.data.data.updateNotification;
      }
    ),
  },
  actions: {
    "set results": assign(({ event }) => {
      assertEvent(event, "xstate.done.actor.loading");
      return { results: event.output };
    }),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDsD2AXAlgM0wYwEMtVlYA6TZTLAgGwGIAxAUQBUBhACQG0AGAXUSgADqljVMJISAAeiAGwAWAMxkAHAHYArABoQAT0SKATMbIBOLcoCMy4-OPnl5xVYC+bvWiy5CxUmS0qAQQlFD0ECRgFMgAbqgA1tFBIWF8gkggouL+0nIISqqaugaIxtbyZFoeXhg4+ESSASmhyOFgAE4dqB1kwrRE2D0AtoHBrVDp0tkSUpn51rzmvGTyxXqGCIrWZrzKSvJa5g4axhrmNSDe9X5N5ACuwhCNbRFRMfFJZI-PWG1TmRmuXmiGUyhW1i0DhKmxsGjIpkO8nkNkU8nMpw0l2uvkaJAeTxe7S6PT6A3QQw6ox+RIBIjEs2QeVB4LIkOhG0QamsVWxdVx-nIsHueDwcFgTDYXDpWQZwNA+UK6m0nIQykUK0sNjsDicLncniu-IagrIwtF4voAFUAAoAEQAgqxmDKgU1mWrlGoyDZjDCysotAj7FCUdY0RiznyfCa7mRsARMLR7h0wJKODwBNM5e6QQhFstVutSp6VnsDkcTmcLnyIHBpDjY-jszlcwrEABaeSqrvRm54gKUCR0FuMj1aCrK-1bZwIva2eyOZyuZR9gVxlphUfy2RcsFkEzWYuw-Zz7WLvUrtdNgI0v5Qbdt3dbYyqyw+7TX274s0isWweBARzOZ2wQCdKmPMojiqI41HMY5FDUPZeHkL8B3IBMkxTMBHxA58dkONk-VVdVKmMNQK2OM5qw8DwgA */
  id: "notifications",
  initial: "initial",
  context: {
    results: [],
  },
  states: {
    initial: {
      on: {
        FETCH: { target: "loading" },
      },
    },
    loading: {
      invoke: {
        id: "loading",
        src: "fetch data",
        input: ({ event }) => {
          assertEvent(event, ["FETCH", "xstate.done.actor.updating"]);
          switch (event.type) {
            case "FETCH":
              const { type, ...input } = event;
              return input;
            case "xstate.done.actor.updating":
              return { userId: event.output.userId };
          }
        },
        onDone: { target: "success", actions: "set results" },
        onError: { target: "failure" },
      },
    },
    updating: {
      invoke: {
        id: "updating",
        src: "update data",
        input: ({ event }) => {
          assertEvent(event, "UPDATE");
          const { type, ...input } = event;
          return input;
        },
        onDone: { target: "loading" },
        onError: { target: "failure" },
      },
    },
    success: {
      on: {
        FETCH: { target: "loading" },
        UPDATE: { target: "updating" },
      },
    },
    failure: {
      on: {
        FETCH: { target: "loading" },
      },
    },
  },
});

export type NotificationsMachine = typeof notificationsMachine;
export type NotificationsSnapshot = SnapshotFrom<NotificationsMachine>;
export type NotificationsActorRef = ActorRef<
  NotificationsSnapshot,
  NotificationsMachineEvents
>;
