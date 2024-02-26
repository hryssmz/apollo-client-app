// machines/authMachine.ts
import { assertEvent, assign, fromPromise, setup } from "xstate";
import type { User } from "@/graphql/graphql";
import { api } from "@/utils/axios";
import { CREATE_USER, GET_USER, LOGIN, LOGOUT, UPDATE_USER } from "@/queries";
import type { ActorRef, SnapshotFrom } from "xstate";
import type {
  Mutation,
  MutationCreateUserArgs,
  MutationLoginArgs,
  MutationLogoutArgs,
  MutationUpdateUserArgs,
  Query,
  QueryGetUserArgs,
} from "@/graphql/graphql";

export interface AuthMachineContext {
  user?: User;
  message?: string;
}

export type AuthMachineEvents =
  | ({ type: "LOGIN" } & MutationLoginArgs)
  | ({ type: "LOGOUT" } & MutationLogoutArgs)
  | ({ type: "UPDATE" } & MutationUpdateUserArgs)
  | ({ type: "REFRESH" } & QueryGetUserArgs)
  | ({ type: "SIGNUP" } & MutationCreateUserArgs)
  | { type: "xstate.done.actor.signup"; output: User }
  | { type: "xstate.done.actor.loading"; output: User }
  | { type: "xstate.done.actor.refreshing"; output: User }
  | { type: "xstate.done.actor.updating"; output: User }
  | { type: "xstate.done.actor.logout"; output: undefined }
  | { type: `xstate.error.actor.${string}`; output: string };

export const authMachine = setup({
  types: {
    context: {} as AuthMachineContext,
    events: {} as AuthMachineEvents,
  },
  actors: {
    "perform signup": fromPromise(
      async ({ input }: { input: MutationCreateUserArgs }) => {
        const response = await api.post<{ data: Pick<Mutation, "createUser"> }>(
          "/graphql",
          { query: CREATE_USER, variables: input }
        );
        return response.data.data.createUser;
      }
    ),
    "perform login": fromPromise(
      async ({ input }: { input: MutationLoginArgs }) => {
        const response = await api.post<{ data: Pick<Mutation, "login"> }>(
          "/graphql",
          { query: LOGIN, variables: input }
        );
        return response.data.data.login;
      }
    ),
    "perform log out": fromPromise(
      async ({ input }: { input: MutationLogoutArgs }) => {
        if (input.payload.id === "") {
          return;
        }
        await api.post<{ data: Pick<Mutation, "logout"> }>("/graphql", {
          query: LOGOUT,
          variables: input,
        });
      }
    ),
    "update profile": fromPromise(
      async ({ input }: { input: MutationUpdateUserArgs }) => {
        const response = await api.post<{ data: Pick<Mutation, "updateUser"> }>(
          "/graphql",
          {
            query: UPDATE_USER,
            variables: input,
          }
        );
        return response.data.data.updateUser;
      }
    ),
    "get user profile": fromPromise(
      async ({ input }: { input: QueryGetUserArgs }) => {
        const response = await api.post<{ data: Pick<Query, "getUser"> }>(
          "/graphql",
          { query: GET_USER, variables: input }
        );
        return response.data.data.getUser;
      }
    ),
  },
  actions: {
    "on success": assign(({ event }) => {
      assertEvent(event, [
        "xstate.done.actor.loading",
        "xstate.done.actor.signup",
        "xstate.done.actor.refreshing",
        "xstate.done.actor.logout",
      ]);
      return { user: event.output };
    }),
    "on error": assign(({ event }) => {
      assertEvent(event, [
        "xstate.error.actor.loading",
        "xstate.error.actor.signup",
        "xstate.error.actor.updating",
        "xstate.error.actor.refreshing",
        "xstate.error.actor.logout",
      ]);
      return { message: event.output };
    }),
    "redirect home after login": () => {
      console.log("redirect to / (TBD)");
    },
  },
}).createMachine({
  id: "authentication",
  initial: "unauthorized",
  context: {
    user: undefined,
    message: undefined,
  },
  states: {
    unauthorized: {
      on: {
        LOGIN: { target: "loading" },
        SIGNUP: { target: "signup" },
      },
    },
    loading: {
      invoke: {
        id: "loading",
        src: "perform login",
        input: ({ event }) => {
          assertEvent(event, "LOGIN");
          const { type, ...input } = event;
          return input;
        },
        onDone: { target: "authorized", actions: "on success" },
        onError: { target: "unauthorized", actions: "on error" },
      },
    },
    signup: {
      invoke: {
        id: "signup",
        src: "perform signup",
        input: ({ event }) => {
          assertEvent(event, "SIGNUP");
          const { type, ...input } = event;
          return input;
        },
        onDone: { target: "authorized", actions: "on success" },
        onError: { target: "unauthorized", actions: "on error" },
      },
    },
    authorized: {
      entry: "redirect home after login",
      on: {
        UPDATE: { target: "updating" },
        REFRESH: { target: "refreshing" },
        LOGOUT: { target: "logout" },
      },
    },
    updating: {
      invoke: {
        id: "updating",
        src: "update profile",
        input: ({ event }) => {
          assertEvent(event, "UPDATE");
          const { type, ...input } = event;
          return input;
        },
        onDone: { target: "refreshing" },
        onError: { target: "unauthorized", actions: "on error" },
      },
    },
    refreshing: {
      invoke: {
        id: "refreshing",
        src: "get user profile",
        input: ({ event }) => {
          assertEvent(event, ["REFRESH", "xstate.done.actor.updating"]);
          switch (event.type) {
            case "REFRESH":
              const { type, ...input } = event;
              return input;
            case "xstate.done.actor.updating":
              const { output } = event;
              return { id: output.id };
          }
        },
        onDone: { target: "authorized", actions: "on success" },
        onError: { target: "unauthorized", actions: "on error" },
      },
    },
    logout: {
      invoke: {
        id: "logout",
        src: "perform log out",
        input: ({ event }) => {
          assertEvent(event, "LOGOUT");
          const { type, ...input } = event;
          return input;
        },
        onDone: { target: "unauthorized", actions: "on success" },
        onError: { target: "unauthorized", actions: "on error" },
      },
    },
  },
});

export type AuthMachine = typeof authMachine;
export type AuthSnapshot = SnapshotFrom<AuthMachine>;
export type AuthActorRef = ActorRef<AuthSnapshot, AuthMachineEvents>;
