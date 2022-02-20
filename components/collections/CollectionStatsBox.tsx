import { FC } from "react";

import {
  useGetCollectionStatsQuery,
  Collection,
} from "@graphql/generated/marketplace/react-apollo";

import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";

import { BigNumber } from "ethers";
import { DECIMALS, strETHToWei, strWeiToETH } from "@utils/data/erc20utils";

interface CollectionStatsBoxProps {
  collection: Collection;
}

const CollectionStatsBox: FC<CollectionStatsBoxProps> = ({ collection }) => {
//   console.log("collection stats box", collection);
  const collectionStatsRes = useGetCollectionStatsQuery({
    variables: {
      id: collection.contract,
    },
    // defaultOption
  });

  if (collectionStatsRes.loading) {
    return <Box>Loading...</Box>;
  }

  if (collectionStatsRes.error) {
    console.error(collectionStatsRes.error);
    return <Box>Error :(</Box>;
  }

  if (
    collectionStatsRes.data === undefined ||
    collectionStatsRes.data === null ||
    collectionStatsRes.data.collection === undefined ||
    collectionStatsRes.data.collection === null
  ) {
    return <Box>No data :(</Box>;
  }

  const collectionStats = collectionStatsRes.data.collection;

  return (
    <Box
      id="collection-top-box"
      sx={{
        my: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "48px",
      }}
    >
      <Box
        id="collection-name-info-box"
        sx={{ height: "56px", marginTop: "48px" }}
      >
        <Typography variant="h3" align="center">
          {collection.name}
        </Typography>
      </Box>

      <Box
        id="collection-info-box"
        sx={{
          height: "64px",
          display: "flex",
          flexDirection: "row",
          marginBottom: "32px",
          gap: "30px",
        }}
      >
        <Box
          id="collection-floor-price-box"
          sx={{
            margin: "0px",
            flexGrow: "1",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Typography variant="h6" color="secondary.dark">
            Floor price
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {`${strWeiToETH(collectionStats.floorPrice)} $MAGIC`}
          </Typography>
        </Box>
        <Box
          id="collection-listings-box"
          sx={{
            margin: "0px",
            flexGrow: "1",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Typography variant="h6" color="secondary.dark">
            Listings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {`${collectionStats.totalListings} Listed`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CollectionStatsBox;
