import { Collection } from "@graphql/generated/next/react-apollo";
import { createContext } from "react";

interface ICollectionsContext {
  collections: Collection[];
}

const defaultContext = {
  collections: [],
};
const CollectionsContext = createContext<ICollectionsContext>(defaultContext);

export default CollectionsContext;

export { type ICollectionsContext };
