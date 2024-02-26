// machines/contactsTransactionMachine.ts
import { assertEvent, assign, fromPromise, setup } from "xstate";
import { api } from "@/utils/axios";
import { GET_CONTACTS_TRANSACTIONS } from "@/queries";
import type { SnapshotFrom } from "xstate";
import type {
  PageData,
  Query,
  QueryGetContactsTransactionsArgs,
  TransactionDetail,
  TransactionDetailPage,
} from "@/graphql/graphql";

export interface ContactsTransactionMachineContext {
  results: TransactionDetail[];
  pageData?: PageData;
}

export type ContactsTransactionMachineEvents =
  | ({ type: "FETCH" } & QueryGetContactsTransactionsArgs)
  | ({ type: "FETCH_MORE" } & QueryGetContactsTransactionsArgs)
  | { type: `xstate.done.actor.${string}`; output: TransactionDetailPage };

export const contactsTransactionMachine = setup({
  types: {
    context: {} as ContactsTransactionMachineContext,
    events: {} as ContactsTransactionMachineEvents,
  },
  actors: {
    "fetch data": fromPromise(
      async ({ input }: { input: QueryGetContactsTransactionsArgs }) => {
        const response = await api.post<{
          data: Pick<Query, "getContactsTransactions">;
        }>("/graphql", {
          query: GET_CONTACTS_TRANSACTIONS,
          variables: input,
        });
        return response.data.data.getContactsTransactions;
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
  id: "contactsTransaction",
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

export type ContactsTransactionMachine = typeof contactsTransactionMachine;
export type ContactsTransactionSnapshot =
  SnapshotFrom<ContactsTransactionMachine>;
