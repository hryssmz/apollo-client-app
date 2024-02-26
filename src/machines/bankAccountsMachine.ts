// machines/bankAccountsMachine.ts
import { assertEvent, assign, fromPromise, setup } from "xstate";
import { api } from "@/utils/axios";
import {
  CREATE_BANK_ACCOUNT,
  DELETE_BANK_ACCOUNT,
  LIST_BANK_ACCOUNTS,
} from "@/queries";
import type { ActorRef, SnapshotFrom } from "xstate";
import type {
  BankAccount,
  Mutation,
  MutationCreateBankAccountArgs,
  MutationDeleteBankAccountArgs,
  Query,
} from "@/graphql/graphql";

export interface BankAccountsMachineContext {
  results: BankAccount[];
}

export type BankAccountsMachineEvents =
  | ({ type: "CREATE" } & MutationCreateBankAccountArgs)
  | ({ type: "DELETE" } & MutationDeleteBankAccountArgs)
  | { type: "FETCH" }
  | { type: "SUCCESS"; results: BankAccount[] }
  | { type: "FAILURE" }
  | { type: "xstate.done.actor.loading"; output: BankAccount[] };

export const bankAccountsMachine = setup({
  types: {
    context: {} as BankAccountsMachineContext,
    events: {} as BankAccountsMachineEvents,
  },
  actors: {
    "fetch data": fromPromise(async () => {
      const response = await api.post<{
        data: Pick<Query, "listBankAccounts">;
      }>("/graphql", { query: LIST_BANK_ACCOUNTS });
      return response.data.data.listBankAccounts;
    }),
    "create data": fromPromise(
      async ({ input }: { input: MutationCreateBankAccountArgs }) => {
        const response = await api.post<{
          data: Pick<Mutation, "createBankAccount">;
        }>("/graphql", { query: CREATE_BANK_ACCOUNT, variables: input });
        return response.data.data.createBankAccount;
      }
    ),
    "delete data": fromPromise(
      async ({ input }: { input: MutationDeleteBankAccountArgs }) => {
        const response = await api.post<{
          data: Pick<Mutation, "deleteBankAccount">;
        }>("/graphql", { query: DELETE_BANK_ACCOUNT, variables: input });
        return response.data.data.deleteBankAccount;
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
  /** @xstate-layout N4IgpgJg5mDOIC5QCMCGA7A1gQQMa4HsBXdAF1gDoBLdK0q1AGwGIAxAUQBUBhACQG0ADAF1EoAA4FYdKgXRiQAD0QA2AIwAOCgFYVAJm0AaEAE9EewYIoB2bQF87xtFjyES5CowKoINKMwg5MGp0ADcCTGCvHz8hUSQQSWl6OQVlBHUtXQNjMwQDNQoDBycMHHxiMkpo33R-MAAnBoIGinFGVFIAMxaAW09vWqg4hSSZVIT0tUEAFisAZjUc00R5uaKZmesATjUVfYOVeZKQZ3K3KopcBrBOvwCgkPDIq5u7upGEsZT5SdW1QoaJZGFb5SwUPbbHZ7Q77GYnM6uSoea63eh1ZiNZqtdqdHoNfqo97DESjKTjX6gdKLQHA3KIIE6BFlJHuSgQMCMMDo-yBdDBGjPYIcrk8z4Sck-NL-WnLPJrLT7KG7WEqazMlwVNkUEXc+5YlptDrdPo6zl6j6kr6S2SUpQyihAuWIGZqiiCaxO+yOU4srWXWBEfBwWBsLh8cWJG0TKmqTQ6fQg+WbIqCRbFH2I-0eQPB2Ch7gAJXY2E47Ej31t0oQa22FG2Ghm81s9PyWwoSuhqpU8MzfouOaDuBDzAAIuwADJcctWiXJKt-GvaQrbbTppPmBsQlTKmGHdV9zUDyhdVBURhEG5hngCWdR+cx+0IaYaKxe1t6DR16ybLuq44nOgBAcvACRZseZIPna6QALQqK2cEaucyKUDQMhMJBFLVjMuwJs6YKFBmpRHihAwxHUmFSounrzO6roaC2oJ6NsdYaJ+wJIaylxEjylELrGCAzHorZqJ6267t2vbEch2q6rx1pQdhej1mudKgvMeiFJ2Kqwge0lcYOeagXOWGLjhhTZBuNbzCoHZqBJumcdmJ5nheNx8Y+UyabRMyqfhvkzO67EZg4QA */
  id: "bankAccounts",
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
        onDone: { target: "success", actions: "set results" },
        onError: { target: "failure" },
      },
    },
    creating: {
      invoke: {
        id: "creating",
        src: "create data",
        input: ({ event }) => {
          assertEvent(event, "CREATE");
          const { type, ...input } = event;
          return input;
        },
        onDone: { target: "success" },
        onError: { target: "failure" },
      },
    },
    deleting: {
      invoke: {
        id: "deleting",
        src: "delete data",
        input: ({ event }) => {
          assertEvent(event, "DELETE");
          const { type, ...input } = event;
          return input;
        },
        onDone: { target: "success" },
        onError: { target: "failure" },
      },
    },
    success: {
      on: {
        FETCH: { target: "loading" },
        CREATE: { target: "creating" },
        DELETE: { target: "deleting" },
      },
    },
    failure: {
      on: {
        FETCH: { target: "loading" },
      },
    },
  },
});

export type BankAccountsMachine = typeof bankAccountsMachine;
export type BankAccountsSnapshot = SnapshotFrom<BankAccountsMachine>;
export type BankAccountsActorRef = ActorRef<
  BankAccountsSnapshot,
  BankAccountsMachineEvents
>;
