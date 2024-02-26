// machines/usersMachine.ts
import { assertEvent, assign, fromPromise, setup } from "xstate";
import { api } from "@/utils/axios";
import { SERACH_USERS } from "@/queries";
import type { ActorRef, SnapshotFrom } from "xstate";
import type { User, Query, QuerySearchUsersArgs } from "@/graphql/graphql";

export interface UsersMachineContext {
  results: User[];
}

export type UsersMachineEvents =
  | ({ type: "FETCH" } & QuerySearchUsersArgs)
  | { type: "xstate.done.actor.loading"; output: User[] };

export const usersMachine = setup({
  types: {
    context: {} as UsersMachineContext,
    events: {} as UsersMachineEvents,
  },
  actors: {
    "fetch data": fromPromise(
      async ({ input }: { input: QuerySearchUsersArgs }) => {
        const response = await api.post<{ data: Pick<Query, "searchUsers"> }>(
          "/graphql",
          { query: SERACH_USERS, variables: input }
        );
        return response.data.data.searchUsers;
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
  id: "users",
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
          assertEvent(event, "FETCH");
          const { type, ...input } = event;
          return input;
        },
        onDone: { target: "success", actions: "set results" },
        onError: { target: "failure" },
      },
    },
    success: {
      on: {
        FETCH: { target: "loading" },
      },
    },
    failure: {
      on: {
        FETCH: { target: "loading" },
      },
    },
  },
});

export type UsersMachine = typeof usersMachine;
export type UsersSnapshot = SnapshotFrom<UsersMachine>;
export type UsersActorRef = ActorRef<UsersSnapshot, UsersMachineEvents>;
