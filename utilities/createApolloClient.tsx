import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_SUBGRAPH_URL,
    cache: new InMemoryCache(),
  });
  return client;
};

export default createApolloClient;
