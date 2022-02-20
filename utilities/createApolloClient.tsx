import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

const createApolloTMClient = (): ApolloClient<NormalizedCacheObject> => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_SUBGRAPH_URL,
    cache: new InMemoryCache(),
  });
  return client;
};

const createApolloTMNextClient = (): ApolloClient<NormalizedCacheObject> => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_SUBGRAPH_URL_NEXT,
    cache: new InMemoryCache(),
  });
  return client;
};

const createApolloMarketplaceClient =
  (): ApolloClient<NormalizedCacheObject> => {
    const client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_SUBGRAPH_URL_MARKETPLACE,
      cache: new InMemoryCache(),
    });
    return client;
  };

const createApolloBridgeworldClient =
  (): ApolloClient<NormalizedCacheObject> => {
    const client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_SUBGRAPH_URL_BRIDGEWORLD,
      cache: new InMemoryCache(),
    });
    return client;
  };

export {
  createApolloTMClient,
  createApolloTMNextClient,
  createApolloMarketplaceClient,
  createApolloBridgeworldClient,
};
