// type Size = "XS" | "SM" | "MD" | "LG" | "XL";
type Size = "SM" | "MD";
const SizeSelectOptions: Size[] = ["SM", "MD"];

interface CardSizeTypeERC721 {
  widthPixel: number;
  heightPixel: number;
  minMarginX: number;
  maxMarginX: number;
  minMarginY: number;
}

interface CardSizeTypeERC1155 {
  widthPixel: number;
  heightPixel: number;
  minMarginX: number;
  maxMarginX: number;
  minMarginY: number;
}

interface CardSizeType {
  ERC721: CardSizeTypeERC721;
  ERC1155: CardSizeTypeERC1155;
  index: number;
  widthPixel: number;
  heightPixel: number;
  minMarginX: number;
  maxMarginX: number;
  minMarginY: number;
  batchSize: number;
}

// interface CardSizesDict {
//   SM: CardSizeType;
//   MD: CardSizeType;
// }

type CardSizesDict = {
  [key in Size]: CardSizeType;
};

const cardSizes: CardSizesDict = {
  SM: {
    ERC721: {
      widthPixel: 128,
      heightPixel: 222,
      minMarginX: 2,
      maxMarginX: 5,
      minMarginY: 5,
    },
    ERC1155: {
      widthPixel: 128,
      heightPixel: 229,
      minMarginX: 2,
      maxMarginX: 5,
      minMarginY: 5,
    },
    index: 1,
    widthPixel: 128,
    heightPixel: 222,
    minMarginX: 2,
    maxMarginX: 5,
    minMarginY: 5,
    batchSize: 84,
  },
  MD: {
    ERC721: {
      widthPixel: 256,
      heightPixel: 406,
      minMarginX: 5,
      maxMarginX: 10,
      minMarginY: 14,
    },
    ERC1155: {
      widthPixel: 256,
      heightPixel: 427,
      minMarginX: 5,
      maxMarginX: 5,
      minMarginY: 10,
    },
    index: 2,
    widthPixel: 256,
    heightPixel: 406,
    minMarginX: 5,
    maxMarginX: 10,
    minMarginY: 14,
    batchSize: 42,
  },
};

export {
  SizeSelectOptions,
  cardSizes,
  type Size,
  type CardSizeTypeERC721,
  type CardSizeTypeERC1155,
  type CardSizeType,
  type CardSizesDict,
};
