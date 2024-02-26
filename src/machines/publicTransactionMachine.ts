// machines/publicTransactionMachine.ts
import { assertEvent, assign, fromPromise, setup } from "xstate";
import { api } from "@/utils/axios";
import { GET_PUBLIC_TRANSACTIONS } from "@/queries";
import type { SnapshotFrom } from "xstate";
import type {
  PageData,
  Query,
  QueryGetPublicTransactionsArgs,
  TransactionDetail,
  TransactionDetailPage,
} from "@/graphql/graphql";

export interface PublicTransactionMachineContext {
  results: TransactionDetail[];
  pageData?: PageData;
}

export type PublicTransactionMachineEvents =
  | ({ type: "FETCH" } & QueryGetPublicTransactionsArgs)
  | ({ type: "FETCH_MORE" } & QueryGetPublicTransactionsArgs)
  | { type: `xstate.done.actor.${string}`; output: TransactionDetailPage };

export const publicTransactionMachine = setup({
  types: {
    context: {} as PublicTransactionMachineContext,
    events: {} as PublicTransactionMachineEvents,
  },
  actors: {
    "fetch data": fromPromise(
      async ({ input }: { input: QueryGetPublicTransactionsArgs }) => {
        const response = await api.post<{
          data: Pick<Query, "getPublicTransactions">;
        }>("/graphql", {
          query: GET_PUBLIC_TRANSACTIONS,
          variables: input,
        });
        return response.data.data.getPublicTransactions;
      }
    ),
  },
  actions: {
    "set results": assign(({ event }) => {
      assertEvent(event, "xstate.done.actor.loading");
      return {
        results: event.output.results,
        pageData: event.output.pageData,
      };
    }),
    "append results": assign(({ context, event }) => {
      assertEvent(event, "xstate.done.actor.loadingMore");
      return {
        results: [...context.results, ...event.output.results],
        pageData: event.output.pageData,
      };
    }),
  },
}).createMachine({
  id: "publicTransaction",
  initial: "initial",
  context: {
    results: [],
    pageData: undefined,
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
    loadingMore: {
      invoke: {
        id: "loadingMore",
        src: "fetch data",
        input: ({ event }) => {
          assertEvent(event, "FETCH_MORE");
          const { type, ...input } = event;
          return input;
        },
        onDone: { target: "success", actions: "append results" },
        onError: { target: "failure" },
      },
    },
    success: {
      on: {
        FETCH: { target: "loading" },
        FETCH_MORE: { target: "loadingMore" },
      },
    },
    failure: {
      on: {
        FETCH: { target: "loading" },
        FETCH_MORE: { target: "loadingMore" },
      },
    },
  },
});

export type PublicTransactionMachine = typeof publicTransactionMachine;
export type PublicTransactionSnapshot = SnapshotFrom<PublicTransactionMachine>;
