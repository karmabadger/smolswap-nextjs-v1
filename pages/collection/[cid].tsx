import { useEffect, FC, useState, useMemo } from "react";
import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import styles from "@styles/Home.module.css";

import { useRouter } from "next/router";
import { parseSearchQuery, SearchQueryDict } from "@utils/parse/searchQuery";

import { useERC721SortBy, useERC1155SortBy } from "@atoms/sortByAtom";
import { useCardSize } from "@atoms/cardSizeAtom";
import { useCollections } from "@atoms/collectionsAtom";
import {
  useGetCollectionsQuery,
  useGetCollectionStatsQuery,
  Collection,
  useGetCollectionListingsQuery,
  InputMaybe,
  Listing_OrderBy,
  OrderDirection,
  Listing,
  Status,
  useGetCollectionsListedTokensQuery,
} from "@graphql/generated/marketplace/react-apollo";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

import CollectionStatsBox from "@components/collections/CollectionStatsBox";
import PropertiesDrawer from "@components/collections/drawer/PropertiesDrawer";
import SearchBar from "@components/collections/searchbar/SearchBar";
import SortSelect from "@components/collections/sort-select/SortSelect";
import {
  SortSelectOptionsERC721Type,
  SortSelectOptionsERC721,
  SortSelectOptionsERC1155Type,
  SortSelectOptionsERC1155,
} from "@components/collections/sort-select/SortSelectOptions";
import SizeSelect from "@components/collections/size-select/SizeSelect";
import { cardSizes } from "@components/collections/size-select/SizeSelectOptions";

import {
  Token,
  useGetCollectionAttributesQuery,
  useGetCollectionListingsMetadataQuery,
  useGetCollectionMetadataQuery,
} from "@graphql/generated/tm/react-apollo";

import {
  apolloClientTMAtom,
  useApolloClientTM,
  apolloClientTMNextAtom,
  useApolloClientTMNext,
  apolloClientMarketplaceAtom,
  useApolloClientMarketplace,
  apolloClientBridgeworldAtom,
  useApolloClientBridgeworld,
} from "@atoms/apolloClientAtom";
import { getAttributesObj } from "@utils/parse/attributesQuery";
import { useTheme } from "@mui/material/styles";
import { Token_OrderBy } from "@graphql/generated/Token_OrderBy";

import CardGrid from "@components/collections/cardgird/CardGrid";
import {
  CollectionListingsListingDataItem,
  CollectionsMetadataDataItem,
} from "@customTypes/treasureMarketplaceQueryTypes";
import { useWalletContext } from "@atoms/walletAtom";
// import { useSigner } from "@atoms/signerAtom";
import useWindowDimensions from "@hooks/useWindowDimensions";

const drawerWidth = 500;
const drawerMinWidth = 40;
const pageMX = 24;
const gridMLeft = 20;
const gridScrollBarWidth = 16.8;

const calculateGridWidth: (windowWidth: number) => number = (
  windowWidth: number
) => {
  const gridWidth = windowWidth - 2 * pageMX - gridMLeft - gridScrollBarWidth;
  return gridWidth;
};

const CollectionPage: NextPage = () => {
  const [collections, setCollections] = useCollections();
  const router = useRouter();
  // not null
  const cid = router.query.cid as string;

  const collection = collections.collectionsDictByPath[cid];

  if (collection === undefined || collection === null) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Smolswap</title>
          <meta
            name="description"
            content="Smolswap: a decentralized aggregator for smol swaps"
          />
          <link rel="icon" href="/favicon.svg" />
        </Head>

        <main className={styles.main}>
          <h1>{`Collection ${cid} Not Found`}</h1>
        </main>
      </div>
    );
  }
  return (
    <Box>
      <Head>
        <title>Smolswap</title>
        <meta
          name="description"
          content="Smolswap: a decentralized aggregator for smol swaps"
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <CollectionMainPage collection={collection} />
    </Box>
  );
};

interface CollectionMainPageProps {
  collection: Collection;
}
const CollectionMainPage: FC<CollectionMainPageProps> = ({ collection }) => {
  const theme = useTheme();
  const router = useRouter();
  const { connectWallet, disconnectWallet, account, signer, connected } =
    useWalletContext();

  const [collections, setCollections] = useCollections();

  // sortBy state
  const sortByQuery = router.query.sort as SortSelectOptionsERC721Type;
  const [sortBy, setSortBy] = useERC721SortBy();
  useEffect(() => {
    if (SortSelectOptionsERC721.includes(sortByQuery)) {
      if (sortByQuery !== undefined && sortByQuery !== null) {
        setSortBy(sortByQuery as SortSelectOptionsERC721Type);
      }
    }
  }, [sortByQuery, setSortBy]);

  // searchQuery state
  // can be null
  const contains = router.query.contains as string;
  const [searchTerm, setSearchTerm] = useState<string>(contains || "");

  // propertiesDrawer state
  const [propertiesDrawerOpen, setPropertiesDrawerOpen] = useState(false);

  // attributes state
  const searchQueryDict: SearchQueryDict = parseSearchQuery(
    router.query.search as string
  );
  const [apolloTMClient, setApolloTMClient] = useApolloClientTM();
  const collectionAttributesRes = useGetCollectionAttributesQuery({
    variables: {
      id: collection.contract,
    },
    client: apolloTMClient,
  });

  const attributesObj = useMemo(() => {
    console.log("useMemo");
    return getAttributesObj(collectionAttributesRes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    collectionAttributesRes.data,
    collectionAttributesRes.loading,
    collectionAttributesRes.error,
    collection.id,
  ]);

  const attributesInitBoolList: boolean[] = [];
  for (let i = 0; i < attributesObj.allAttributesOrderedList.length; i++) {
    attributesInitBoolList.push(false);
  }
  const [attributesBoolList, setAttributesBoolList] = useState<boolean[]>(
    attributesInitBoolList
  );

  const [pageNum, setPageNum] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const collectionListingsRes = useGetCollectionListingsQuery({
    variables: {
      isERC1155: false,
      erc721Filters: {
        quantity_gt: 0,
        status: "Active" as InputMaybe<Status>,
        collection: "0x6325439389e0797ab35752b4f43a14c004f22a9c",
      },
      erc721Ordering: "pricePerItem" as InputMaybe<Listing_OrderBy>,
      erc1155Filters: {
        collection: "0x6325439389e0797ab35752b4f43a14c004f22a9c",
      },
      erc1155Ordering: "pricePerItem" as InputMaybe<Token_OrderBy>,
      skip: pageNum * pageSize,
      orderDirection: "asc" as InputMaybe<OrderDirection>,
      first: pageSize,
    },
  });

  const collectionListedTokenIdsRes = useGetCollectionsListedTokensQuery({
    variables: {
      collection: collection.contract,
    },
  });

  // console.log("collectionListedTokenIdsRes", collectionListedTokenIdsRes);

  const listings: CollectionListingsListingDataItem[] =
    collectionListingsRes.data?.listings || [];

  const ids = listings.map(
    (listing: CollectionListingsListingDataItem) => listing.token.id
  );

  const collectionMetadataRes = useGetCollectionMetadataQuery({
    variables: {
      ids: ids,
    },
    client: apolloTMClient,
  });

  const tokenMetadataList: CollectionsMetadataDataItem[] =
    collectionMetadataRes.data?.tokens || [];

  if (collectionMetadataRes.error) {
    console.error("collectionMetadataRes.error", collectionMetadataRes.error);
  }

  const tokenMetadataDict: { [key: string]: CollectionsMetadataDataItem } =
    useMemo(() => {
      console.log("useMemoMetadata");
      const newTokenMetadataDict: {
        [key: string]: CollectionsMetadataDataItem;
      } = {};
      tokenMetadataList.forEach((token: CollectionsMetadataDataItem) => {
        newTokenMetadataDict[token.id] = token;
      });
      return newTokenMetadataDict;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenMetadataList]);

  // cardSize state
  const [cardSize, setCardSize] = useCardSize();
  const cardSizeObj = cardSizes[cardSize];

  const { width, height } = useWindowDimensions();
  const gridWidth = calculateGridWidth(width || 0);

  const cardWidthWithMargin =
    cardSizeObj["ERC721"].widthPixel + cardSizeObj["ERC721"].minMarginX;
  const cardHeightWithMargin =
    cardSizeObj["ERC721"].heightPixel + cardSizeObj["ERC721"].minMarginY;

  const NumberOfColumns = Math.floor(gridWidth / cardWidthWithMargin);

  // console.log("gridWidth", gridWidth);
  return (
    <Box
      id="collections-main-page"
      sx={{
        padding: "0px",
        mx: `${pageMX}px`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CollectionStatsBox collection={collection} />
      <Divider />
      <Box
        id="collection-main-box"
        sx={{
          marginTop: "32px",
          mx: "0px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <PropertiesDrawer
          drawerMinWidth={drawerMinWidth}
          drawerWidth={drawerWidth}
          open={propertiesDrawerOpen}
          setOpen={setPropertiesDrawerOpen}
          attributesObj={attributesObj}
          attributesBoolList={attributesBoolList}
          setAttributesBoolList={setAttributesBoolList}
        />

        <Box
          id="collection-main-right-box"
          sx={{ flexGrow: "1", marginLeft: `${gridMLeft}px` }}
        >
          <Box
            id="collection-grid-top-box"
            sx={{
              display: "flex",
              flexDirection: "row",
              alignContent: "stretch",
              flexWrap: "wrap",
              gap: "24px",
            }}
          >
            <Box
              id="collection-search-box"
              sx={{ minWidth: "200px", flexGrow: "10" }}
            >
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </Box>

            <Box
              id="collection-sort-box"
              sx={{ width: "220px", minWidth: "100px", flexGrow: "3" }}
            >
              <SortSelect
                sortBy={sortBy}
                setSortBy={setSortBy}
                ercType={collection.standard}
              />
            </Box>

            <Box
              id="collection-size-box"
              sx={{ width: "80px", minWidth: "60px", flexGrow: "1" }}
            >
              <SizeSelect cardSize={cardSize} setCardSize={setCardSize} />
            </Box>
          </Box>

          <Box
            id="grid-info"
            sx={{
              marginTop: 0,
              marginBottom: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <Box
              id="results-text"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <Box>
                <Typography
                  variant="body2"
                  color={theme.palette.text.secondary}
                >
                  {`${pageSize} results on page ${pageNum + 1}`}
                  {/* {`${pageActualSize} results on page ${
                    page + 1
                  }/${pageCount} out of ${resultsCount} total results`} */}
                </Typography>
              </Box>
              <Box>
                <Button
                  sx={{
                    py: 0,
                  }}
                  disabled={listings && listings.length > 0 && !connected}
                  // onClick={handleOpenQuickAddModal}
                >
                  Quick Add
                </Button>
              </Box>
            </Box>
            {searchTerm && (
              <Box
                id="search-chips-box"
                sx={{
                  marginTop: 0,
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                }}
              >
                <Chip
                  label={searchTerm}
                  color="secondary"
                  onDelete={() => {
                    setSearchTerm("");
                  }}
                />
              </Box>
            )}
          </Box>

          <Box id="collection-grid-main-box">
            {listings.length > 0 ? (
              <CardGrid
                columnCount={NumberOfColumns}
                gridWidth={gridWidth}
                cardWidthWithMargin={cardWidthWithMargin}
                cardHeightWithMargin={cardHeightWithMargin}
                cardSize={cardSize}
                ercType={collection.standard}
                listings={listings}
                tokenMetadataList={tokenMetadataList}
                tokenMetadataDict={tokenMetadataDict}
                // lazyRes={lazyRes}
                sortBy={sortBy}
                viewERC1155={"listings"}
                collection={collection}
              />
            ) : collectionListingsRes.loading ? (
              <Typography>Loading...</Typography>
            ) : collectionListingsRes.error ? (
              <Typography>Error</Typography>
            ) : (
              <Typography>No listings found</Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { cid } = context.query;

//   console.log("cid", cid);

//   const collections = await createApolloMarketplaceClient().query({
//     query: GET_COLLECTIONS,
//   });

//   return {
//     props: {
//       collections: collections.data.collections,
//     },
//   };
// };

// export async function getServerSideProps() {
//   const apolloClient = createApolloMarketplaceClient();

//   const { data, loading, error } = await apolloClient.query({
//     query: GET_COLLECTIONS,
//   });

//   console.log("data", data);

//   if (error) {
//     console.error(error);
//     return {
//       props: {
//         collectionsSSR: [],
//         error: error,
//       },
//     };
//   }

//   return {
//     props: {
//       collectionsSSR: data.collections,
//       error: null,
//     },
//   };
// }

export default CollectionPage;
