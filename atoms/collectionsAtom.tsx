import { atom, useAtom } from "jotai";
import { Collection } from "@graphql/generated/marketplace/react-apollo";

import {
  collectionNameToPath,
  collectionPathToName,
} from "@utils/data/collectionData";

interface ICollectionsAtom {
  collections: Collection[];
  collectionsDictByAddress: { [key: string]: Collection };
  collectionsDictByPath: { [key: string]: Collection };
  collectionsNameToCollection: (name: string) => Collection;
}

const createCollectionsAtomObj: (
  collections: Collection[]
) => ICollectionsAtom = (collections: Collection[]) => {
  const collectionsDictByAddress: { [key: string]: Collection } = {};
  const collectionsDictByPath: { [key: string]: Collection } = {};

  collections.forEach((collection) => {
    collectionsDictByAddress[collection.id] = collection;
    collectionsDictByPath[collectionNameToPath(collection.name)] = collection;
  });

  const collectionsNameToCollection: (name: string) => Collection = (
    name: string
  ) => {
    return collectionsDictByPath[collectionNameToPath(name)];
  };

  const collectionsAtomObj: ICollectionsAtom = {
    collections,
    collectionsDictByAddress,
    collectionsDictByPath,
    collectionsNameToCollection,
  };

  return collectionsAtomObj;
};

const defaultCollectionsAtom: ICollectionsAtom = {
  collections: [],
  collectionsDictByAddress: {},
  collectionsDictByPath: {},
  collectionsNameToCollection: function (name: string) {
    return this.collectionsDictByPath[collectionNameToPath(name)];
  },
};
const collectionsAtom = atom<ICollectionsAtom>(defaultCollectionsAtom);

const useCollections = () => {
  const collections = useAtom(collectionsAtom);
  return collections;
};

export default collectionsAtom;

export { useCollections, createCollectionsAtomObj };
