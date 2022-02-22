type SortSelectOptionsERC721Type =
  | "Price: Low to High"
  | "Price: High to Low"
  | "Latest"
  | "Earliest";
//   | "Token ID: Low to High"
//   | "Token ID: High to Low"
//   | "Rarity: High to Low"
//   | "Rarity: Low to High"
//   | "Name: A to Z"
//   | "Name: Z to A";

const SortSelectOptionsERC721: SortSelectOptionsERC721Type[] = [
  "Price: Low to High",
  "Price: High to Low",
  "Latest",
  "Earliest",
  // "Newest to Oldest",
  // "Oldest to Newest",
  // "Token ID: Low to High",
  // "Token ID: High to Low",
  //   "Rarity: High to Low",
  //   "Rarity: Low to High",
  //   "Name: A to Z",
  //   "Name: Z to A",
];

interface SortSelectERC721Obj {
  name: string;
  label: SortSelectOptionsERC721Type;
  direction: string;
  by: string;
}

type SortSelectERC721Dict = {
  [key in SortSelectOptionsERC721Type]: SortSelectERC721Obj;
};

const SortSelectOptionsERC721Obj: SortSelectERC721Dict = {
  "Price: Low to High": {
    name: "pricePerItem",
    label: "Price: Low to High",
    direction: "asc",
    by: "listings",
  },
  "Price: High to Low": {
    name: "pricePerItem",
    label: "Price: High to Low",
    direction: "desc",
    by: "listings",
  },
  Latest: {
    name: "blockTimestamp",
    label: "Latest",
    direction: "desc",
    by: "listings",
  },
  Earliest: {
    name: "blockTimestamp",
    label: "Earliest",
    direction: "asc",
    by: "listings",
  },
};

type SortSelectOptionsERC1155Type =
  | "Token ID Price: Low to High"
  | "Token ID Price: High to Low"
  | "Latest"
  | "Earliest";

const SortSelectOptionsERC1155: SortSelectOptionsERC1155Type[] = [
  "Token ID Price: Low to High",
  "Token ID Price: High to Low",
  // "Listing Price: Low to High",
  // "Listing Price: High to Low",
  "Latest",
  "Earliest",
  // "Newest to Oldest",
  // "Oldest to Newest",
  // "Token ID: Low to High",
  // "Token ID: High to Low",
  // "Rarity"
];

interface SortSelectERC1155Obj {
  name: string;
  label: SortSelectOptionsERC1155Type;
  direction: string;
  by: string;
}
type SortSelectERC1155Dict = {
  [key in SortSelectOptionsERC1155Type]: SortSelectERC1155Obj;
};
const SortSelectOptionsERC1155Obj: SortSelectERC1155Dict = {
  "Token ID Price: Low to High": {
    name: "pricePerItem",
    label: "Token ID Price: Low to High",
    direction: "asc",
    by: "tokens",
  },
  "Token ID Price: High to Low": {
    name: "pricePerItem",
    label: "Token ID Price: Low to High",
    direction: "desc",
    by: "tokens",
  },
  //   "Listing Price: Low to High": {
  //     name: "pricePerItem",
  //     label: "Price: Low to High",
  //     direction: "asc",
  //     by: "listings",
  //   },
  //   "Listing Price: High to Low": {
  //     name: "pricePerItem",
  //     label: "Price: High to Low",
  //     direction: "desc",
  //     by: "listings",
  //   },
  Latest: {
    name: "blockTimestamp",
    label: "Latest",
    direction: "desc",
    by: "listings",
  },
  Earliest: {
    name: "blockTimestamp",
    label: "Earliest",
    direction: "asc",
    by: "listings",
  },
};

export {
  type SortSelectOptionsERC721Type,
  type SortSelectERC721Dict,
  type SortSelectERC721Obj,
  SortSelectOptionsERC721,
  SortSelectOptionsERC721Obj,
  type SortSelectOptionsERC1155Type,
  type SortSelectERC1155Dict,
  type SortSelectERC1155Obj,
  SortSelectOptionsERC1155,
  SortSelectOptionsERC1155Obj,
};
