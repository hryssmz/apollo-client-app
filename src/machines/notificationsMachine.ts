// machines/notificationsMachine.ts
import { assertEvent, assign, fromPromise, setup } from "xstate";
import { api } from "@/utils/axios";
import { GET_UNREAD_NOTIFICATIONS, UPDATE_NOTIFICATION } from "@/queries";
import type { SnapshotFrom } from "xstate";
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
  | { type: "SUCCESS"; results?: Notification[] }
  | { type: "FAILURE" };

export const notificationsMachine = setup({
  types: {
    context: {} as NotificationsMachineContext,
    events: {} as NotificationsMachineEvents,
  },
  actors: {
    "fetch data": fromPromise(
      async ({ input }: { input: QueryGetUnreadNotificationsArgs }) => {
        const response = await api.post<{ data: Query }>("/graphql", {
          query: GET_UNREAD_NOTIFICATIONS,
          variables: input,
        });
        const { getUnreadNotifications } = response.data.data;
        return { results: getUnreadNotifications };
      }
    ),
    "update data": fromPromise(
      async ({ input }: { input: MutationUpdateNotificationArgs }) => {
        await api.post<{ data: Mutation }>("/graphql", {
          query: UPDATE_NOTIFICATION,
          variables: input,
        });
      }
    ),
  },
  actions: {
    "set results": assign(({ event }) => {
      assertEvent(event, "SUCCESS");
      return { results: event.results };
    }),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDsD2AXAlgM0wYwEMtVlYA6AG1QIk2SgGIISwy6A3VAa1bS10LFSlarXoIOqQZhIBtAAwBdBYsSgADqliYhakAA9EARgAcJsgE4rVgEwmALAGYA7ADZnRgDQgAnohv2NmQArPJhYSaOFjY2Fo6uAL4J3nw4+EQywlQ0dIxgAE75qPlk6hRE2MUAtmSpAhkk5NliUBLInNJySip6mtq6SAaIwQ5k9vKuNsH2RlNG8o5evoiO9uYxrsGrI-JxUYnJIHXpQuQAruoQGfRMLGzt3LwYaZ3CF1dY4pKvKj2DfTpMnpDAgjBYjGQTHZZgtnAFgkZpt4-AgTBDQuFFvY4c5pkYkilnvVTmR3tc8oViqVyuhKvkasdXudLuS2h0GshfkpelpASRgcNRuNJni5gsliiLM4xkZXHKTM5djZHMEbASjkSTplyLAzng8HBYAwAGIAUQAKgBhAASfw0vIGoBBpnM1lsDhc7glKzlli28lxuOViIOhP4WsaZF1+sNDAAqgAFAAiAEFzaa7SAAY6hqCzJY3XYnG4PMjjK55CFwvIoa4TBYJtj1YyOeRsARMBQzvkwCaLTbM9mgYMQcFomM6x44sqa4EywgbL6NtMbPJ5q4jPNnElDmgIHA9C3Tjz+sOnYgALSuecX4IFt0P6yOZuapkiHL0E985AChCONGQrMqo2M4aKrjMzjziBQRRI4NimCM0Srviu6vq2pIsp8UBfjmIIuOY0x1pErguDEUrzvmcpys49gjBBRgqi+4ZvtGBqwPA-wOmeuZzssoIBmQjjVlYoTBJsIxMS86Htp23ZgDh3Egm4riWBMUy0as-7yPYUFQmMbjTPWa4WGOEw7gkQA */
  id: "notifications",
  initial: "success",
  context: {
    results: [],
  },
  states: {
    loading: {
      invoke: {
        src: "fetch data",
        input: ({ event }) => {
          assertEvent(event, "FETCH");
          const { type, ...input } = event;
          return input;
        },
        onDone: {
          description: "Notifications fetched",
          target: "success",
          actions: "set results",
        },
        onError: {
          description: "Fetch error",
          target: "failure",
        },
      },
    },
    updating: {
      invoke: {
        src: "update data",
        input: ({ event }) => {
          assertEvent(event, "UPDATE");
          const { type, ...input } = event;
          return input;
        },
        onDone: {
          description: "Notification updated",
          target: "success",
        },
        onError: {
          description: "Update error",
          target: "failure",
        },
      },
    },
    success: {
      on: {
        FETCH: {
          description: "Fetch notifications",
          target: "loading",
        },
        UPDATE: {
          description: "Update notification",
          target: "updating",
        },
      },
    },
    failure: {
      on: {
        FETCH: {
          description: "Fetch notifications",
          target: "loading",
        },
      },
    },
  },
});

export type NotificationsMachine = typeof notificationsMachine;
export type NotificationsSnapshot = SnapshotFrom<NotificationsMachine>;
