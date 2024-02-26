// machines/createTransactionMachine.ts
import { assertEvent, assign, fromPromise, setup } from "xstate";
import { api } from "@/utils/axios";
import { CREATE_TRANSACTION } from "@/queries";
import type { ActorRef, SnapshotFrom } from "xstate";
import type {
  Mutation,
  MutationCreateTransactionArgs,
  User,
} from "@/graphql/graphql";

export interface CreateTransactionMachineContext {
  sender?: User;
  receiver?: User;
  transactionPayload?: Pick<
    MutationCreateTransactionArgs["payload"],
    "amount" | "description" | "senderId" | "receiverId"
  > & { transactionType: "payment" | "request" };
}

export type CreateTransactionMachineEvents =
  | ({ type: "SET_USERS" } & { sender: User; receiver: User })
  | ({
      type: "CREATE";
      transactionType: "payment" | "request";
    } & MutationCreateTransactionArgs)
  | { type: "RESET" };

export const createTransactionMachine = setup({
  types: {
    context: {} as CreateTransactionMachineContext,
    events: {} as CreateTransactionMachineEvents,
  },
  actors: {
    "create transaction": fromPromise(
      async ({ input }: { input: MutationCreateTransactionArgs }) => {
        const response = await api.post<{
          data: Pick<Mutation, "createTransaction">;
        }>("/graphql", { query: CREATE_TRANSACTION, variables: input });
        console.info(response.data);
      }
    ),
  },
  actions: {
    "set sender and receiver": assign(({ event }) => {
      assertEvent(event, "SET_USERS");
      return { sender: event.sender, receiver: event.receiver };
    }),
    "set transaction payload": assign(({ event }) => {
      assertEvent(event, "CREATE");
      return {
        transactionPayload: {
          amount: event.payload.amount,
          description: event.payload.description,
          receiverId: event.payload.receiverId,
          senderId: event.payload.senderId,
          transactionType: event.transactionType,
        },
      };
    }),
    "clear context": assign(({ event }) => {
      assertEvent(event, "RESET");
      return {
        sender: undefined,
        receiver: undefined,
        transactionPayload: undefined,
      };
    }),
  },
}).createMachine({
  id: "createTransaction",
  initial: "stepOne",
  context: {
    sender: undefined,
    receiver: undefined,
    transactionPayload: undefined,
  },
  states: {
    stepOne: {
      on: {
        SET_USERS: { target: "stepTwo", actions: "set sender and receiver" },
      },
    },
    stepTwo: {
      on: {
        CREATE: { target: "creating", actions: "set transaction payload" },
      },
    },
    creating: {
      invoke: {
        id: "creating",
        src: "create transaction",
        input: ({ event }) => {
          assertEvent(event, "CREATE");
          const { type, ...input } = event;
          return input;
        },
        onDone: { target: "stepThree" },
        onError: { target: "stepThree" },
      },
    },
    stepThree: {
      on: {
        RESET: { target: "stepOne", actions: "clear context" },
      },
    },
  },
});

export type CreateTransactionMachine = typeof createTransactionMachine;
export type CreateTransactionSnapshot = SnapshotFrom<CreateTransactionMachine>;
export type CreateTransactionActorRef = ActorRef<
  CreateTransactionSnapshot,
  CreateTransactionMachineEvents
>;
