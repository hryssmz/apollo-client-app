// queries/index.ts
import { gql } from "@/graphql";
export * from "./auth";
export * from "./bankAccount";
export * from "./comment";
export * from "./like";
export * from "./notification";
export * from "./transaction";
export * from "./user";

export const QuerySchema = gql(`
  query Query {
    schema: __schema {
      types {
        name
      }
      queryType {
        name
      }
      mutationType {
        name
      }
      subscriptionType {
        name
      }
    }
  }
`);
