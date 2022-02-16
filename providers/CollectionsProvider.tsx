import { FC } from "react";

import CollectionsContext from "contexts/CollectionsContext";
import { Collection } from "@graphql/generated/next/react-apollo";

interface CollectionsProviderProps {
  collections: Collection[];
}

const CollectionsProvider: FC<CollectionsProviderProps> = ({
  children,
  collections,
}) => {
  return (
    <CollectionsContext.Provider value={{ collections }}>
      {children}
    </CollectionsContext.Provider>
  );
};
