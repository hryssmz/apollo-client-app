// components/cypress-rwa/utils/apollo.ts
import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

export const uri = import.meta.env.DEV
  ? "http://localhost:13003/graphql"
  : "/graphql";

export const wsUrl = import.meta.env.DEV
  ? "ws://localhost:13003/graphql"
  : "/graphql";

const httpLink = new HttpLink({ uri });
const wsLink = new GraphQLWsLink(createClient({ url: wsUrl }));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
