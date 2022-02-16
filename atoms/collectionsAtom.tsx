import { atom } from "jotai";
import { Collection } from "@graphql/generated/next/react-apollo";

const collectionsAtom = atom<Collection[]>([]);

export default collectionsAtom;
