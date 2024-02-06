// machines/dataMachine.ts
import { assertEvent, assign, setup } from "xstate";

export interface PageData {
  page: number;
}

export interface DataMachineContext<T> {
  pageData?: PageData;
  results: T[];
  message?: string;
}

export type DataMachineEvents<T> =
  | { type: "FETCH" }
  | { type: "UPDATE" }
  | { type: "CREATE" }
  | { type: "DELETE" }
  | { type: "SUCCESS"; results: T[]; pageData?: PageData }
  | { type: "FAILURE"; message: string };

export const createDataMachine = <T>(machineId: string) =>
  setup({
    types: {
      context: {} as DataMachineContext<T>,
      events: {} as DataMachineEvents<T>,
    },
    actions: {
      "set results": assign(({ event }) => {
        assertEvent(event, "SUCCESS");
        return {
          results: event.results,
        };
      }),
      "set page data": assign(({ event }) => {
        assertEvent(event, "SUCCESS");
        return { pageData: event.pageData };
      }),
      "set message": assign(({ event }) => {
        assertEvent(event, "FAILURE");
        return { message: event.message };
      }),
    },
    guards: {
      "has data": ({ context }) =>
        !!context.results && context.results.length > 0,
    },
  }).createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOlwgBswBiAMQFEAVAYQAkBtABgF1FQAHAPaxcAF1yD8fEAA9EAVgAcAdhIAWAMzL5AGhABPRADYNARhJHFGgEzWAnKaNPnAXxd60WPIVLkq1ZgAlegBBRnouXiQQIRFxSWk5BHllVU1tPUMEO2t5Enl5ayM1RUVOO0KtNw8MHAJiMkoaAFUABQARMIieaVixCSlopIK0rV0DRGsNDRJODTsFxaW7I2qQTzqfRv92+gAZJm6ogWF+hKHERzVMy7nzTkLi0vLKxTWN7waKQXQIAihqBBJGAyPgAG6CADWII+9VI31+-wQBAhmHQ8XwkUivVOGMSiEUdhmamsphU4yy1m06mmtgczlc7nWtU+8J+f3wALAACduYJuSR+BR0QAzfmoEiwrYIjlQZHgwRojFYnrRPp4i4IUy0kik8k3BDKIzmeSOUx2ThqI3mubvFlwkgAV34EHR-0BwNBEOhkvtW2drvEnPlqLdkhVxxiuIG+IQpWJeoyE2S2pIRJs9kcDNWTKlDQDbs51B5fIFQtF4t9XgdBaDcpRirDmJ42LV0fOoCShITZKTWTJ1nUZVMlqzDLt1a2mG5YELAKBhC9UJhfoa09ndZDjeVLdVJziMc1FsUJHmnCMuQN2kHmgz9OzE82a5nc+LvP5guFojF3IledI65zluSoDBGOIHh2siIA4J5nheFLQXM6g5NedjWhaaiPqyJAQGAVB1h6i4Nj6-44XhYCbg2IHhrukbqoenbQWSp4WvBV4LGmtKZtmOY1JODS4fh7olh+5bfpWpGCRRSJUU2YFthBgyMdkzFwZeyYjpwJ4LFShRocaGFYQ6sCOpgmBwLAdBMGwrb7mcSlQckKQ0n2iDzDMZJ3mOjJ8U+pAmWZFkBMEXS2VGimxkooyuXG1IPEUJRlBUUzKEZWwBeZsCWW0nThGF9GQcMVouQhWqKIO8jzMsyy8cy-H+aZmWWbsBx5Xu4X2ZFRjRaVdhlPkjyJS8KVpQ0GUWU6+CQvgggAO74NQ+Xtg5STmtcyZqOanFeTxo0NYFWWTdNc0Lewph0ctsZrQaVonredLeU4e0kCK6C4BQjozlZLAcO1BUrZcOqJqVyimPcZoYehtprDNuHwNE-7gZ1moALTWOtWR2GoabDqO2byHYz1+GASMaspJIGjkg7WJwCXPMlVS5qubKIpypMMY5YMaHk1iKKY6lZMomgkOVRhaSYw2M752G1v87OFcYyh2JxMVrWm8g8Q+TP1SQgF1vLAOGuUsymBrAsEio6hGESptWgZlrPVJ+sKcjymWKolru71ORptbZjyHbNqYdrfkkONWUG7G6MGrkqiWDtWvS8ZjUTY6U0zfNkeaso1g3ej+QLISSjTCX1jPeHsAkLNYjYAABIG6BZ8p3NGCL6SlZtJ6eQ9u0h9hFdVzXgiOqI9foo3Ltk45Ldt2MN1GhYVg94ndWh6972fSTk8c6thScCQSte5TqQi4oBPlaYJJn6DbhuEAA */
    id: machineId,
    initial: "idle",
    context: {
      pageData: undefined,
      results: [],
      message: undefined,
    },
    states: {
      idle: {
        on: {
          FETCH: { target: "loading" },
          CREATE: { target: "creating" },
          UPDATE: { target: "updating" },
          DELETE: { target: "deleting" },
        },
      },
      loading: {
        invoke: {
          src: "fetchData",
          onDone: { target: "success" },
          onError: { target: "failure", actions: "set message" },
        },
      },
      updating: {
        invoke: {
          src: "updateData",
          onDone: { target: "loading" },
          onError: { target: "failure", actions: "set message" },
        },
      },
      creating: {
        invoke: {
          src: "createData",
          onDone: { target: "loading" },
          onError: { target: "failure", actions: "set message" },
        },
      },
      deleting: {
        invoke: {
          src: "deleteData",
          onDone: { target: "loading" },
          onError: { target: "failure", actions: "set message" },
        },
      },
      success: {
        entry: ["set results", "set page data"],
        on: {
          FETCH: { target: "loading" },
          CREATE: { target: "creating" },
          UPDATE: { target: "updating" },
          DELETE: { target: "deleting" },
        },
        initial: "unknown",
        states: {
          unknown: {
            always: [
              { guard: "has data", target: "with data" },
              { target: "without data" },
            ],
          },
          "with data": {},
          "without data": {},
        },
      },
      failure: {
        entry: ["set message"],
        on: {
          FETCH: "loading",
        },
      },
    },
  });
