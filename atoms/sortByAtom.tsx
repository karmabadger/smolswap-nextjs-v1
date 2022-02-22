import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import {
  SortSelectOptionsERC721Type,
  SortSelectOptionsERC1155Type,
  SortSelectOptionsERC721,
  SortSelectOptionsERC1155,
} from "@components/collections/sort-select/SortSelectOptions";

const ERC721SortByAtom = atomWithStorage<SortSelectOptionsERC721Type>(
  "sortBy",
  SortSelectOptionsERC721[0]
);

const useERC721SortBy = () => {
  const ERC721SortBy = useAtom(ERC721SortByAtom);
  return ERC721SortBy;
};

const ERC1155SortByAtom = atomWithStorage<SortSelectOptionsERC1155Type>(
  "sortBy",
  SortSelectOptionsERC1155[0]
);

const useERC1155SortBy = () => {
  const ERC1155SortBy = useAtom(ERC1155SortByAtom);
  return ERC1155SortBy;
};

export {
  ERC721SortByAtom,
  useERC721SortBy,
  ERC1155SortByAtom,
  useERC1155SortBy,
};
