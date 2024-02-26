// machines/transactionDetailMachine.ts
import { assertEvent, assign, fromPromise, setup } from "xstate";
import { api } from "@/utils/axios";
import {
  CREATE_COMMENT,
  CREATE_LIKE,
  GET_TRANSACTION_DETAIL,
  UPDATE_TRANSACTION,
} from "@/queries";
import type { ActorRef, SnapshotFrom } from "xstate";
import type {
  Comment,
  Like,
  Mutation,
  MutationCreateCommentArgs,
  MutationCreateLikeArgs,
  MutationUpdateTransactionArgs,
  Query,
  QueryGetTransactionDetailArgs,
  Transaction,
  TransactionDetail,
} from "@/graphql/graphql";

export interface TransactionDetailMachineContext {
  transactionDetail?: TransactionDetail;
}

export type TransactionDetailMachineEvents =
  | ({ type: "FETCH" } & QueryGetTransactionDetailArgs)
  | ({ type: "CREATE_COMMENT" } & MutationCreateCommentArgs)
  | ({ type: "CREATE_LIKE" } & MutationCreateLikeArgs)
  | ({ type: "UPDATE" } & MutationUpdateTransactionArgs)
  | { type: "xstate.done.actor.loading"; output: TransactionDetail }
  | { type: "xstate.done.actor.creatingComment"; output: Comment }
  | { type: "xstate.done.actor.creatingLike"; output: Like }
  | { type: "xstate.done.actor.updating"; output: Transaction };

export const transactionDetailMachine = setup({
  types: {
    context: {} as TransactionDetailMachineContext,
    events: {} as TransactionDetailMachineEvents,
  },
  actors: {
    "fetch data": fromPromise(
      async ({ input }: { input: QueryGetTransactionDetailArgs }) => {
        const response = await api.post<{
          data: Pick<Query, "getTransactionDetail">;
        }>("/graphql", { query: GET_TRANSACTION_DETAIL, variables: input });
        return response.data.data.getTransactionDetail;
      }
    ),
    "create comment": fromPromise(
      async ({ input }: { input: MutationCreateCommentArgs }) => {
        const response = await api.post<{
          data: Pick<Mutation, "createComment">;
        }>("/graphql", {
          query: CREATE_COMMENT,
          variables: input,
        });
        return response.data.data.createComment;
      }
    ),
    "create like": fromPromise(
      async ({ input }: { input: MutationCreateLikeArgs }) => {
        const response = await api.post<{
          data: Pick<Mutation, "createLike">;
        }>("/graphql", {
          query: CREATE_LIKE,
          variables: input,
        });
        return response.data.data.createLike;
      }
    ),
    "update data": fromPromise(
      async ({ input }: { input: MutationUpdateTransactionArgs }) => {
        const response = await api.post<{
          data: Pick<Mutation, "updateTransaction">;
        }>("/graphql", {
          query: UPDATE_TRANSACTION,
          variables: input,
        });
        return response.data.data.updateTransaction;
      }
    ),
  },
  actions: {
    "set result": assign(({ event }) => {
      assertEvent(event, "xstate.done.actor.loading");
      return { transactionDetail: event.output };
    }),
  },
}).createMachine({
  id: "transactionDetail",
  initial: "initial",
  context: {
    transactionDetail: undefined,
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
          assertEvent(event, [
            "FETCH",
            "xstate.done.actor.creatingComment",
            "xstate.done.actor.creatingLike",
            "xstate.done.actor.updating",
          ]);
          switch (event.type) {
            case "FETCH":
              const { type, ...input } = event;
              return input;
            case "xstate.done.actor.creatingComment":
            case "xstate.done.actor.creatingLike":
              return { id: event.output.transactionId };
            case "xstate.done.actor.updating":
              return { id: event.output.id };
          }
        },
        onDone: { target: "success", actions: "set result" },
        onError: { target: "failure" },
      },
    },
    creatingComment: {
      invoke: {
        id: "creatingComment",
        src: "create comment",
        input: ({ event }) => {
          assertEvent(event, "CREATE_COMMENT");
          const { type, ...input } = event;
          return input;
        },
        onDone: { target: "loading" },
        onError: { target: "failure" },
      },
    },
    creatingLike: {
      invoke: {
        id: "creatingLike",
        src: "create like",
        input: ({ event }) => {
          assertEvent(event, "CREATE_LIKE");
          const { type, ...input } = event;
          return input;
        },
        onDone: { target: "loading" },
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
        CREATE_COMMENT: { target: "creatingComment" },
        CREATE_LIKE: { target: "creatingLike" },
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

export type TransactionDetailMachine = typeof transactionDetailMachine;
export type TransactionDetailSnapshot = SnapshotFrom<TransactionDetailMachine>;
export type TransactionDetailActorRef = ActorRef<
  TransactionDetailSnapshot,
  TransactionDetailMachineEvents
>;
