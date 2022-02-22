import { ApolloClient, useApolloClient } from "@apollo/client";
import { atom, useAtom } from "jotai";

import {
  createApolloTMClient,
  createApolloTMNextClient,
  createApolloMarketplaceClient,
  createApolloBridgeworldClient,
} from "@utilities/createApolloClient";

const apolloClientTMAtom = atom<ApolloClient<any>>(createApolloTMClient());
const useApolloClientTM = () => {
  const client = useAtom(apolloClientTMAtom);
  return client;
};

const apolloClientTMNextAtom = atom<ApolloClient<any>>(
  createApolloTMNextClient()
);
const useApolloClientTMNext = () => {
  const client = useAtom(apolloClientTMNextAtom);
  return client;
};

const apolloClientMarketplaceAtom = atom<ApolloClient<any>>(
  createApolloMarketplaceClient()
);
const useApolloClientMarketplace = () => {
  const client = useAtom(apolloClientMarketplaceAtom);
  return client;
};

const apolloClientBridgeworldAtom = atom<ApolloClient<any>>(
  createApolloBridgeworldClient()
);
const useApolloClientBridgeworld = () => {
  const client = useAtom(apolloClientBridgeworldAtom);
  return client;
};

export {
  apolloClientTMAtom,
  useApolloClientTM,
  apolloClientTMNextAtom,
  useApolloClientTMNext,
  apolloClientMarketplaceAtom,
  useApolloClientMarketplace,
  apolloClientBridgeworldAtom,
  useApolloClientBridgeworld,
};
