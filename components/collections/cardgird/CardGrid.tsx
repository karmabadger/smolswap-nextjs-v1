import { useState, useEffect, useRef, FC } from "react";

import { FixedSizeGrid as Grid } from "react-window";

// import InfiniteLoader from "react-window-infinite-loader";

import Box from "@mui/material/Box";

import ERC721Card from "./ERC721Card/ERC721Card";
// import ERC1155Card from "./ERC1155Card/ERC1155Card";
import {
  Collection,
  Listing,
} from "@graphql/generated/marketplace/react-apollo";
import { Size } from "../size-select/SizeSelectOptions";
import {
  CollectionListingsListingDataItem,
  CollectionListingsTokenDataItem,
  CollectionsMetadataDataItem,
} from "@customTypes/treasureMarketplaceQueryTypes";

interface CellProps {
  columnIndex: number;
  rowIndex: number;
  style: any;
}
interface CardGridProps {
  collection: Collection;
  gridWidth: number;

  columnCount: number;
  cardWidthWithMargin: number;
  cardHeightWithMargin: number;
  cardSize: Size;
  viewERC1155: string;
  ercType: string;
  listings: CollectionListingsListingDataItem[];
  // | CollectionListingsTokenDataItem[];
  tokenMetadataList: CollectionsMetadataDataItem[];
  sortBy: string;
  tokenMetadataDict: { [key: string]: CollectionsMetadataDataItem };
}
const CardGrid: FC<CardGridProps> = ({
  collection,

  gridWidth,
  columnCount,
  cardWidthWithMargin,
  cardHeightWithMargin,
  cardSize,
  ercType,
  viewERC1155,

  listings,
  sortBy,
  tokenMetadataList,
  tokenMetadataDict,
  //   lazyRes,
}) => {
  const count = listings.length;

  const rowCount = columnCount !== 0 ? Math.ceil(count / columnCount) : 1;

  //   console.log("rowCount", rowCount, columnCount, count);

  console.log("tokenMetadataList", listings, tokenMetadataList);

  const Cell: FC<CellProps> = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * columnCount + columnIndex;
    // const item = getItem(columnIndex, rowIndex);
    const listing = listings[index];
    const tokenMetadata = tokenMetadataDict[listing.token.id];
    if (ercType === "ERC721") {
      if (!listing || !listing.token) {
        const content = "";
        return <div style={style}>{content}</div>;
      }
      return (
        <div style={style}>
          <ERC721Card
            cardSize={cardSize}
            listing={listing}
            tokenMetadata={tokenMetadata}
            collection={collection}
            listIndex={index}
          />
        </div>
      );
    } else {
      //   if (!item || !item.name) {
      //     const content = "";
      //     return <div style={style}>{content}</div>;
      //   }
      //   return (
      //     <div style={style}>
      //       <ERC1155Card
      //         cardSize={cardSize}
      //         item={item}
      //         collection={collection}
      //       />
      //     </div>
      //   );

      return <div style={style}>NOT YET IMPLEMENTED</div>;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        style={{ width: "100%" }}
        // itemCount={count}
        columnCount={columnCount}
        columnWidth={cardWidthWithMargin}
        height={1350}
        rowCount={rowCount}
        rowHeight={cardHeightWithMargin}
        width={gridWidth}
      >
        {Cell}
      </Grid>
    </Box>
  );
};

export default CardGrid;
