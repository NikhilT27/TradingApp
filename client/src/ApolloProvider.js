import React from "react";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
  makeVar,
} from "@apollo/client";

export const cartItemsStock = makeVar([]);

const httpLink = createHttpLink({
  uri: "https://apollo-graphql-server-27.herokuapp.com/",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
